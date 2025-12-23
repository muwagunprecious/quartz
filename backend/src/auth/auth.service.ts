import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto, UserRole } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async register(dto: RegisterDto) {
        // Check if email exists
        const existing = await this.usersService.findOne(dto.email);
        if (existing) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Create user logic
        // We need to handle transaction if creating profiles
        // For simplicity, we create user then profile. Ideally use prisma.$transaction

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password_hash: hashedPassword,
                    role: dto.role,
                    university_id: dto.university_id,
                    whatsapp_number: dto.whatsapp_number,
                },
            });

            if (dto.role === UserRole.SELLER) {
                if (!dto.whatsapp_number) throw new BadRequestException('Sellers must provide a WhatsApp number');
                await tx.sellerProfile.create({
                    data: { user_id: user.id },
                });
            } else if (dto.role === UserRole.RIDER) {
                if (!dto.university_id) throw new BadRequestException('Riders must provide a University');

                // NIN is no longer collected at signup, but via optional document upload later
                await tx.riderProfile.create({
                    data: {
                        user_id: user.id,
                        university_id: dto.university_id,
                        is_online: false,
                        verification_status: 'PENDING'
                    },
                });
            }

            return this.generateTokens(user);
        });
    }

    async login(dto: LoginDto) {
        console.log(`[AuthService] Login attempt for: ${dto.email}`);
        const user = await this.usersService.findOne(dto.email);
        if (!user) {
            console.log(`[AuthService] User not found: ${dto.email}`);
            throw new UnauthorizedException('Invalid credentials');
        }

        if (user.is_banned) {
            console.log(`[AuthService] User is banned: ${dto.email}`);
            throw new UnauthorizedException('Your account has been banned. Please contact support.');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password_hash);
        console.log(`[AuthService] Password match: ${isMatch}`);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateTokens(user);
    }


    private generateTokens(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role, university_id: user.university_id };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secretKey',
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                university_id: user.university_id,
                whatsapp_number: user.whatsapp_number
            }
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secretKey',
            });

            const user = await this.validateUser(payload);
            if (!user) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            return this.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async validateUser(payload: any) {
        return this.usersService.findById(payload.sub);
    }
}
