import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
        });
    }

    async validate(payload: any) {
        console.log('[JwtStrategy] Validating payload:', payload);
        const user = await this.usersService.findById(payload.sub);

        if (!user) {
            console.warn('[JwtStrategy] User not found for ID:', payload.sub);
            throw new UnauthorizedException();
        }

        if (user.is_banned) {
            throw new UnauthorizedException('User account is banned');
        }

        return user;
    }
}
