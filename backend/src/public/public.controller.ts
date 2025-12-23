
import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('public')
@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) { }

    @Get('universities')
    @ApiOperation({ summary: 'Get all universities' })
    findAllUniversities() {
        return this.publicService.findAllUniversities();
    }

    @Get('banners')
    @ApiOperation({ summary: 'Get active banners' })
    getBanners() {
        return this.publicService.getActiveBanners();
    }
}
