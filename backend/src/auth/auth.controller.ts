import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user (Student, Seller, Rider)' })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    async refresh(@Body() dto: { refresh_token: string }) {
        return this.authService.refreshToken(dto.refresh_token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiOperation({ summary: 'Get current user profile' })
    getProfile(@Request() req) {
        return req.user;
    }
}
