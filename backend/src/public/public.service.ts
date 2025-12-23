
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
    constructor(private prisma: PrismaService) { }

    async findAllUniversities() {
        return this.prisma.university.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async getActiveBanners() {
        return this.prisma.banner.findMany({
            where: { is_active: true },
            orderBy: { created_at: 'desc' },
        });
    }
}
