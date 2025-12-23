import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SellersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { user_id: userId },
            include: { user: { select: { name: true, email: true, whatsapp_number: true, university: true } } }
        });
        if (!seller) throw new NotFoundException('Seller profile not found');
        return seller;
    }

    async updateProfile(userId: string, data: any) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { user_id: userId }
        });
        if (!seller) throw new NotFoundException('Seller profile not found');

        const { whatsapp_number, store_categories, ...profileData } = data;

        return this.prisma.$transaction(async (tx) => {
            // 1. Update User if whatsapp_number is provided
            if (whatsapp_number) {
                await tx.user.update({
                    where: { id: userId },
                    data: { whatsapp_number }
                });
            }

            // 2. Update SellerProfile
            return tx.sellerProfile.update({
                where: { id: seller.id },
                data: {
                    ...profileData,
                    store_categories: store_categories ? store_categories.join(',') : undefined
                },
                include: { user: { select: { name: true, email: true, whatsapp_number: true } } }
            });
        });
    }

    async getStore(storeId: string) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: storeId },
            include: {
                user: { select: { name: true, university: true } },
                products: {
                    where: { is_published: true },
                    include: { images: true }
                },
                reviews: {
                    include: { buyer: { select: { name: true } } },
                    orderBy: { created_at: 'desc' }
                }
            }
        });
        if (!seller) throw new NotFoundException('Store not found');
        return seller;
    }
}
