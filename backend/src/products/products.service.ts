import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export enum StockStatus {
    IN_STOCK = 'IN_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: any) {
        // 1. Get Seller Profile to identify University
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { user_id: userId },
            include: { user: true }
        });

        if (!seller) throw new NotFoundException('Seller profile not found');
        if (!seller.user.university_id) throw new BadRequestException('Seller must belong to a university');
        if (!seller.user.whatsapp_number) {
            throw new BadRequestException('You must provide a WhatsApp number in your store settings before uploading products');
        }

        // 2. Create Product and Images
        const { images, category_id, ...productData } = data;

        if (!category_id) {
            throw new BadRequestException('Category is required');
        }

        try {
            return await this.prisma.product.create({
                data: {
                    ...productData,
                    seller: { connect: { id: seller.id } },
                    university: { connect: { id: seller.user.university_id } },
                    category: category_id.length > 20
                        ? { connect: { id: category_id } }
                        : { connect: { slug: category_id } },
                    images: {
                        create: images?.map((item: any, index: number) => ({
                            url: typeof item === 'string' ? item : item.url,
                            order_index: typeof item === 'object' && item.order_index !== undefined ? item.order_index : index
                        })) || []
                    }
                },
                include: { images: true }
            });
        } catch (error) {
            console.error('Error creating product:', error);
            throw new BadRequestException('Failed to create product: ' + error.message);
        }
    }

    async findMyProducts(userId: string) {
        return this.prisma.product.findMany({
            where: {
                seller: { user_id: userId }
            },
            include: {
                images: true,
                university: true,
                category: true
            },
            orderBy: { created_at: 'desc' }
        });
    }

    async getSellerStats(userId: string) {
        const products = await this.prisma.product.findMany({
            where: { seller: { user_id: userId } },
            select: { views: true, clicks: true }
        });

        const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
        const totalClicks = products.reduce((sum, p) => sum + (p.clicks || 0), 0);
        const ctr = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

        return {
            totalProducts: products.length,
            totalViews,
            totalClicks,
            clickThroughRate: ctr.toFixed(1)
        };
    }

    async findAll(universitySlug?: string, categorySlug?: string) {
        const where: Prisma.ProductWhereInput = {
            is_published: true,
        };

        if (universitySlug) {
            where.university = { slug: universitySlug };
        }
        if (categorySlug) {
            where.category = { slug: categorySlug };
        }

        return this.prisma.product.findMany({
            where,
            include: {
                images: true,
                university: true,
                category: true,
                seller: { include: { user: { select: { name: true, email: true, whatsapp_number: true } } } }
            },
            orderBy: { created_at: 'desc' }
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                university: true,
                category: true,
                seller: { include: { user: { select: { name: true, email: true, whatsapp_number: true } } } }
            }
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async addImages(productId: string, imageUrls: string[]) {
        const data = imageUrls.map((url, index) => ({
            product_id: productId,
            url,
            order_index: index
        }));
        return this.prisma.productImage.createMany({ data });
    }

    async update(userId: string, productId: string, data: any) {
        // Verify ownership
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product) throw new NotFoundException('Product not found');
        if (product.seller.user_id !== userId) {
            throw new ForbiddenException('You can only update your own products');
        }

        return this.prisma.product.update({
            where: { id: productId },
            data,
            include: { images: true }
        });
    }

    async delete(userId: string, productId: string) {
        // Verify ownership
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product) throw new NotFoundException('Product not found');
        if (product.seller.user_id !== userId) {
            throw new ForbiddenException('You can only delete your own products');
        }

        return this.prisma.product.delete({
            where: { id: productId }
        });
    }

    async removeImage(userId: string, productId: string, imageId: string) {
        // Verify ownership
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product) throw new NotFoundException('Product not found');
        if (product.seller.user_id !== userId) {
            throw new ForbiddenException('You can only modify your own products');
        }

        return this.prisma.productImage.delete({
            where: { id: imageId }
        });
    }

    async toggleStock(userId: string, productId: string, stockStatus: StockStatus) {
        // Verify ownership
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product) throw new NotFoundException('Product not found');
        if (product.seller.user_id !== userId) {
            throw new ForbiddenException('You can only modify your own products');
        }

        return this.prisma.product.update({
            where: { id: productId },
            data: { stock_status: stockStatus }
        });
    }

    async incrementViews(productId: string) {
        return this.prisma.product.update({
            where: { id: productId },
            data: { views: { increment: 1 } }
        });
    }

    async incrementClicks(productId: string) {
        return this.prisma.product.update({
            where: { id: productId },
            data: { clicks: { increment: 1 } }
        });
    }
}
