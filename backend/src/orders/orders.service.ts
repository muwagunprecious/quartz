import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveriesService } from '../deliveries/deliveries.service';

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export enum DeliveryOption {
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY'
}

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private deliveriesService: DeliveriesService
    ) { }

    async create(userId: string, data: any) {
        // Get product details
        const product = await this.prisma.product.findUnique({
            where: { id: data.product_id },
            include: { seller: true }
        });

        if (!product) throw new NotFoundException('Product not found');
        if (product.stock_status === 'OUT_OF_STOCK') {
            throw new BadRequestException('Product is out of stock');
        }

        const priceTotal = product.price * data.quantity;

        // Create order in transaction
        return this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    buyer_id: userId,
                    seller_id: product.seller_id,
                    product_id: product.id,
                    quantity: data.quantity,
                    price_total: priceTotal,
                    delivery_option: data.delivery_option,
                    delivery_fee: data.delivery_fee || 0,
                    status: OrderStatus.PENDING
                },
                include: {
                    product: { include: { images: true } },
                    seller: { include: { user: true } },
                    buyer: true
                }
            });

            // Auto-create delivery request if requested
            if (data.create_delivery_request && data.delivery_option === DeliveryOption.DELIVERY) {
                await this.deliveriesService.createRequest(
                    order.id,
                    data.offered_delivery_price || data.delivery_fee || 0,
                    userId,
                    data.delivery_address,
                    data.delivery_contact
                );
            }

            return order;
        });
    }

    async findAll(userId: string, role: string) {
        const where: any = {};

        if (role === 'SELLER') {
            // Get seller profile
            const seller = await this.prisma.sellerProfile.findUnique({
                where: { user_id: userId }
            });
            if (seller) {
                where.seller_id = seller.id;
            }
        } else {
            // Buyer orders
            where.buyer_id = userId;
        }

        return this.prisma.order.findMany({
            where,
            include: {
                product: { include: { images: true } },
                seller: { include: { user: true } },
                buyer: true,
                delivery: true
            },
            orderBy: { created_at: 'desc' }
        });
    }

    async findOne(orderId: string, userId: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                product: { include: { images: true } },
                seller: { include: { user: true } },
                buyer: true,
                delivery: { include: { rider: { include: { user: true } } } }
            }
        });

        if (!order) throw new NotFoundException('Order not found');

        // Authorization check
        const isBuyer = order.buyer_id === userId;
        const isSeller = order.seller.user_id === userId;

        if (!isBuyer && !isSeller) {
            throw new ForbiddenException('Unauthorized to view this order');
        }

        return order;
    }

    async updateStatus(orderId: string, userId: string, status: OrderStatus) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { seller: true }
        });

        if (!order) throw new NotFoundException('Order not found');

        // Only seller can update order status
        if (order.seller.user_id !== userId) {
            throw new ForbiddenException('Only seller can update order status');
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
    }
}
