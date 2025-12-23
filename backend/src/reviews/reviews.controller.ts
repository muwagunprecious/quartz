import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Submit a review for a seller' })
    async create(@Request() req, @Body() body: any) {
        return this.reviewsService.create(req.user.id, body);
    }

    @Get('seller/:id')
    @ApiOperation({ summary: 'Get reviews for a specific seller' })
    async getForSeller(@Param('id') id: string) {
        return this.reviewsService.getForSeller(id);
    }
}
