import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    async create(buyerId: string, data: { seller_id: string; rating: number; comment?: string }) {
        // Verify buyer hasn't already reviewed this seller (optional rule)
        const existingReview = await this.prisma.review.findFirst({
            where: { buyer_id: buyerId, seller_id: data.seller_id }
        });
        if (existingReview) throw new BadRequestException('You have already reviewed this seller');

        // Verify buyer actually bought something from seller (optional but good)
        const order = await this.prisma.order.findFirst({
            where: { buyer_id: buyerId, seller_id: data.seller_id, status: 'DELIVERED' }
        });
        // For now, let's just allow it if there's any order, or skip check if strictly requested
        // if (!order) throw new BadRequestException('You can only review sellers you have purchased from');

        const review = await this.prisma.review.create({
            data: {
                buyer_id: buyerId,
                seller_id: data.seller_id,
                rating: data.rating,
                comment: data.comment
            }
        });

        // Update seller rating (simplistic avg update)
        const allReviews = await this.prisma.review.findMany({
            where: { seller_id: data.seller_id }
        });
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await this.prisma.sellerProfile.update({
            where: { id: data.seller_id },
            data: { rating: avgRating }
        });

        return review;
    }

    async getForSeller(sellerId: string) {
        return this.prisma.review.findMany({
            where: { seller_id: sellerId },
            include: { buyer: { select: { name: true } } },
            orderBy: { created_at: 'desc' }
        });
    }
}
