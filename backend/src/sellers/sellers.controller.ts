import { Controller, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateSellerProfileDto } from './dto/update-seller-profile.dto';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
    constructor(private sellersService: SellersService) { }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current seller profile' })
    async getProfile(@Request() req) {
        console.log('[SellersController] getProfile called by user:', req.user.id);
        return this.sellersService.getProfile(req.user.id);
    }

    @Patch('profile')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update current seller profile' })
    async updateProfile(@Request() req, @Body() dto: UpdateSellerProfileDto) {
        console.log('[SellersController] updateProfile called by user:', req.user.id);
        return this.sellersService.updateProfile(req.user.id, dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get public store data' })
    async getStore(@Param('id') id: string) {
        return this.sellersService.getStore(id);
    }
}
