import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export enum DeliveryStatus {
    PENDING = 'PENDING',
    NEGOTIATING = 'NEGOTIATING',
    ACCEPTED = 'ACCEPTED',
    PICKED_UP = 'PICKED_UP',
    ON_MY_WAY = 'ON_MY_WAY',
    AT_THE_GATE = 'AT_THE_GATE',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}
import { AppGateway } from '../gateway/app.gateway';

@Injectable()
export class DeliveriesService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway
    ) { }

    async createRequest(orderId: string | undefined, initialPrice: number, userId: string, pickup: string, dropoff: string, itemName?: string) {
        let universityId: string;
        let connectOrder = {};

        if (orderId) {
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
                include: { product: true }
            });
            if (!order) throw new NotFoundException('Order not found');
            universityId = order.product.university_id;
            connectOrder = { order: { connect: { id: orderId } } };
        } else {
            // Generic request
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user?.university_id) throw new BadRequestException('Please update your profile with a university first.');
            universityId = user.university_id;
        }

        const delivery = await this.prisma.delivery.create({
            data: {
                ...connectOrder,
                university_id: universityId, // Store directly
                item_name: itemName,
                offered_price: initialPrice,
                initiated_by: userId,
                pickup_address: pickup,
                dropoff_address: dropoff,
                status: DeliveryStatus.PENDING,
            },
            include: { order: { include: { product: true } } }
        });

        // Notify Riders in University
        this.gateway.notifyRiders(universityId, 'delivery_request', delivery);

        return delivery;
    }

    async findAllPending(universityId: string) {
        return this.prisma.delivery.findMany({
            where: {
                status: DeliveryStatus.PENDING,
                university_id: universityId
            },
            include: { order: { include: { product: true, seller: { include: { user: true } }, buyer: true } } }
        });
    }

    async acceptRequest(deliveryId: string, riderId: string) {
        return this.prisma.$transaction(async (tx) => {
            const delivery = await tx.delivery.findUnique({
                where: { id: deliveryId },
                include: { order: true }
            });

            if (!delivery || delivery.status !== DeliveryStatus.PENDING) {
                throw new BadRequestException('Delivery not available');
            }

            if (delivery.rider_id) {
                throw new BadRequestException('Delivery already accepted by another rider');
            }

            const code = Math.floor(1000 + Math.random() * 9000).toString();

            const updated = await tx.delivery.update({
                where: { id: deliveryId },
                data: {
                    rider_id: riderId,
                    status: DeliveryStatus.ACCEPTED,
                    code: code,
                    negotiated_price: null
                }
            });

            // Notify Buyer and Seller
            this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_accepted', updated);
            this.gateway.notifyUser(delivery.order.seller_id, 'delivery_accepted', updated); // Using seller_id might need lookup if its profile id logic differs, but assuming relation works via user room if seller_id is user_id. Wait, seller_id is Schema SellerProfile.id.
            // SellerProfile.user_id is what we need. 
            // We need to fetch seller user id.
            const sellerProfile = await tx.sellerProfile.findUnique({ where: { id: delivery.order.seller_id } });
            if (sellerProfile) {
                this.gateway.notifyUser(sellerProfile.user_id, 'delivery_accepted', updated);
            }

            return updated;
        });
    }

    async negotiate(deliveryId: string, riderId: string, price: number) {
        const delivery = await this.prisma.delivery.update({
            where: { id: deliveryId },
            data: {
                status: DeliveryStatus.NEGOTIATING,
                negotiated_price: price,
            },
            include: { order: true }
        });

        // Notify buyer
        this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_negotiation', delivery);
        return delivery;
    }

    async verifyCode(deliveryId: string, code: string) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id: deliveryId },
            include: { order: { include: { seller: true } } }
        });
        if (!delivery) throw new NotFoundException('Delivery not found');

        if (delivery.code === code) {
            const updated = await this.prisma.delivery.update({
                where: { id: deliveryId },
                data: {
                    status: DeliveryStatus.DELIVERED,
                    delivered_at: new Date()
                }
            });
            // Notify all
            this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_completed', updated);
            this.gateway.notifyUser(delivery.order.seller.user_id, 'delivery_completed', updated);
            return updated;
        } else {
            throw new BadRequestException('Invalid Code');
        }
    }

    async updateStatus(deliveryId: string, status: DeliveryStatus, riderId?: string) {
        if (riderId) {
            const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });
            if (delivery && delivery.rider_id !== riderId) {
                throw new BadRequestException('Only assigned rider can update status');
            }
        }

        const data: any = { status };
        if (status === DeliveryStatus.PICKED_UP) data.picked_up_at = new Date();
        if (status === DeliveryStatus.ON_MY_WAY) data.on_way_at = new Date();
        if (status === DeliveryStatus.AT_THE_GATE) data.at_gate_at = new Date();

        const updated = await this.prisma.delivery.update({
            where: { id: deliveryId },
            data,
            include: { order: { include: { seller: true } } }
        });

        this.gateway.notifyUser(updated.order.buyer_id, 'delivery_status_update', updated);
        this.gateway.notifyUser(updated.order.seller.user_id, 'delivery_status_update', updated);

        return updated;
    }

    async findOne(deliveryId: string, userId: string) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id: deliveryId },
            include: {
                order: {
                    include: {
                        product: true,
                        buyer: true,
                        seller: { include: { user: true } }
                    }
                },
                rider: { include: { user: true } }
            }
        });

        if (!delivery) throw new NotFoundException('Delivery not found');

        // Authorization check: only buyer, seller, or assigned rider can view
        const isBuyer = delivery.order.buyer_id === userId;
        const isSeller = delivery.order.seller.user_id === userId;
        const isRider = delivery.rider?.user_id === userId;

        if (!isBuyer && !isSeller && !isRider) {
            throw new BadRequestException('Unauthorized to view this delivery');
        }

        return delivery;
    }

    async respondToNegotiation(deliveryId: string, userId: string, accept: boolean) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id: deliveryId },
            include: { order: true }
        });

        if (!delivery) throw new NotFoundException('Delivery not found');
        if (delivery.status !== DeliveryStatus.NEGOTIATING) {
            throw new BadRequestException('No active negotiation');
        }

        // Verify buyer authorization
        if (delivery.order.buyer_id !== userId) {
            throw new BadRequestException('Only buyer can respond to negotiation');
        }

        if (accept) {
            // Generate code and accept
            const code = Math.floor(1000 + Math.random() * 9000).toString();
            return this.prisma.delivery.update({
                where: { id: deliveryId },
                data: {
                    status: DeliveryStatus.ACCEPTED,
                    code: code
                }
            });
        } else {
            // Decline - cancel delivery
            return this.prisma.delivery.update({
                where: { id: deliveryId },
                data: {
                    status: DeliveryStatus.CANCELLED,
                    negotiated_price: null
                }
            });
        }
    }

    async cancelDelivery(deliveryId: string, userId: string) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id: deliveryId },
            include: { order: true }
        });

        if (!delivery) throw new NotFoundException('Delivery not found');

        // Only buyer or seller can cancel
        const isBuyer = delivery.order.buyer_id === userId;
        const isSeller = delivery.initiated_by === userId;

        if (!isBuyer && !isSeller) {
            throw new BadRequestException('Unauthorized to cancel this delivery');
        }

        // Can only cancel if not yet delivered
        if (delivery.status === DeliveryStatus.DELIVERED) {
            throw new BadRequestException('Cannot cancel delivered order');
        }

        return this.prisma.delivery.update({
            where: { id: deliveryId },
            data: { status: DeliveryStatus.CANCELLED }
        });
    }
}
