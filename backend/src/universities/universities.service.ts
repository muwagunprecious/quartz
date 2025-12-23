import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversitiesService {
    constructor(private prisma: PrismaService) { }

    async create(createUniversityDto: CreateUniversityDto) {
        return this.prisma.university.create({
            data: createUniversityDto,
        });
    }

    async findAll() {
        return this.prisma.university.findMany({
            include: { _count: { select: { users: true, products: true } } },
            orderBy: { name: 'asc' }
        });
    }

    async findOne(id: string) {
        return this.prisma.university.findUnique({
            where: { id },
            include: { _count: { select: { users: true, products: true } } }
        });
    }

    async update(id: string, updateUniversityDto: UpdateUniversityDto) {
        return this.prisma.university.update({
            where: { id },
            data: updateUniversityDto,
        });
    }

    async remove(id: string) {
        return this.prisma.university.delete({
            where: { id },
        });
    }
}
