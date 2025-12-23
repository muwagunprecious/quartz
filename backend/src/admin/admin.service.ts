import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../gateway/app.gateway';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway
    ) { }

    // --- Content Management ---
    async getBanners() {
        return this.prisma.banner.findMany({ orderBy: { created_at: 'desc' } });
    }

    async createBanner(data: { title: string; image_url: string; subtitle?: string; cta_text?: string }) {
        return this.prisma.banner.create({ data });
    }

    async toggleBanner(id: string, is_active: boolean) {
        return this.prisma.banner.update({ where: { id }, data: { is_active } });
    }

    async deleteBanner(id: string) {
        return this.prisma.banner.delete({ where: { id } });
    }

    // --- Page & Section Control ---
    async getPageControls() {
        return this.prisma.pageControl.findMany();
    }

    async updatePageControl(page: string, section: string, is_enabled: boolean, msg?: string) {
        // Handle empty/null section names consistently
        const sectionName = section || '';
        console.log(`[AdminService] updatePageControl: page=${page}, section='${sectionName}', is_enabled=${is_enabled}`);

        return this.prisma.pageControl.upsert({
            where: { page_name_section_name: { page_name: page, section_name: sectionName } },
            update: { is_enabled, maintenance_msg: msg },
            create: { page_name: page, section_name: sectionName, is_enabled, maintenance_msg: msg },
        });
    }

    // --- User Management ---
    async getUsers(role?: string) {
        const where = role ? { role: role as any } : {};
        return this.prisma.user.findMany({
            where,
            include: { seller_profile: true, rider_profile: true },
            orderBy: { created_at: 'desc' }
        });
    }

    async banUser(userId: string) {
        return this.prisma.user.update({ where: { id: userId }, data: { is_banned: true, is_active: false } });
    }

    async unbanUser(userId: string) {
        return this.prisma.user.update({ where: { id: userId }, data: { is_banned: false, is_active: true } });
    }

    // --- Delivery & Riders ---
    async getRiders(status?: string) {
        const where = status ? { verification_status: status } : {};
        return this.prisma.riderProfile.findMany({
            where,
            include: { user: { select: { name: true, email: true } }, university: true }
        });
    }

    async verifyRider(riderId: string, status: string = 'VERIFIED') {
        const rider = await this.prisma.riderProfile.findUnique({ where: { id: riderId } });
        if (!rider) throw new NotFoundException('Rider not found');

        return this.prisma.riderProfile.update({
            where: { id: riderId },
            data: { verification_status: status }
        });
    }

    // --- Seller & Inventory ---
    async getInventoryStats() {
        // This is heavy, in production use aggregations or cache
        return this.prisma.sellerProfile.findMany({
            include: {
                _count: { select: { products: true, orders_sold: true } },
                user: { select: { name: true } }
            },
            take: 20,
            orderBy: { orders_sold: { _count: 'desc' } }
        });
    }

    // --- Complaints ---
    async getComplaints(status?: 'PENDING' | 'RESOLVED' | 'DISMISSED') {
        const where = status ? { status } : {};
        return this.prisma.complaint.findMany({
            where,
            include: { user: { select: { name: true, email: true } } },
            orderBy: { created_at: 'desc' }
        });
    }

    async resolveComplaint(id: string, response: string, status: 'RESOLVED' | 'DISMISSED' = 'RESOLVED') {
        return this.prisma.complaint.update({
            where: { id },
            data: { response, status }
        });
    }

    // --- Universities ---
    async getUniversities() {
        return this.prisma.university.findMany({
            include: { _count: { select: { users: true, products: true } } },
            orderBy: { name: 'asc' }
        });
    }

    async createUniversity(data: { name: string; slug: string; city?: string }) {
        return this.prisma.university.create({ data });
    }

    async updateUniversity(id: string, data: any) {
        return this.prisma.university.update({ where: { id }, data });
    }

    async deleteUniversity(id: string) {
        return this.prisma.university.delete({ where: { id } });
    }

    // --- Categories ---
    async getCategories() {
        return this.prisma.category.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' }
        });
    }

    async createCategory(data: { name: string; slug: string }) {
        return this.prisma.category.create({ data });
    }

    async updateCategory(id: string, data: any) {
        return this.prisma.category.update({ where: { id }, data });
    }

    async deleteCategory(id: string) {
        return this.prisma.category.delete({ where: { id } });
    }

    // --- Analytics ---
    async getDashboardStats() {
        const [users, products, orders, revenue] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.product.count(),
            this.prisma.order.count(),
            this.prisma.order.aggregate({ _sum: { price_total: true } })
        ]);

        // Fetch orders from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setHours(0, 0, 0, 0);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrders = await this.prisma.order.findMany({
            where: { created_at: { gte: sevenDaysAgo } },
            select: { created_at: true, price_total: true }
        });

        // Aggregate by date
        const trendMap = new Map();
        recentOrders.forEach(order => {
            const dateStr = order.created_at.toISOString().split('T')[0];
            const existing = trendMap.get(dateStr) || { orders: 0, revenue: 0 };
            trendMap.set(dateStr, {
                orders: existing.orders + 1,
                revenue: existing.revenue + order.price_total
            });
        });

        // Format for frontend
        const trend = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            const data = trendMap.get(dateStr) || { orders: 0, revenue: 0 };
            return { date: dateStr, ...data };
        });

        return {
            total_users: users,
            total_products: products,
            total_orders: orders,
            total_revenue: revenue._sum.price_total || 0,
            trend
        };
    }

    // --- Admin Notifications ---
    async getNotifications() {
        return this.prisma.adminNotification.findMany({
            orderBy: { created_at: 'desc' },
            include: { university: { select: { name: true } } },
            take: 50
        });
    }

    async sendNotification(message: string, universityId?: string) {
        const target = universityId ? 'UNIVERSITY' : 'ALL';

        // Save to database
        const notification = await this.prisma.adminNotification.create({
            data: {
                message,
                target,
                university_id: universityId || null
            }
        });

        // Broadcast via WebSocket
        const payload = { id: notification.id, message, created_at: notification.created_at };
        if (universityId) {
            this.gateway.notifyUniversity(universityId, 'admin_notification', payload);
        } else {
            this.gateway.notifyAllUsers('admin_notification', payload);
        }

        return notification;
    }
}
