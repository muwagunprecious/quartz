import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, AddProductImagesDto, ToggleStockDto } from './dto/update-product.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'List products (filter by university/category)' })
    async findAll(@Query('university') universitySlug: string, @Query('category') categorySlug: string) {
        return this.productsService.findAll(universitySlug, categorySlug);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'List current seller products' })
    async findMyProducts(@Request() req) {
        return this.productsService.findMyProducts(req.user.id);
    }

    @Get('stats')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current seller statistics' })
    async getSellerStats(@Request() req) {
        return this.productsService.getSellerStats(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product details' })
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create product (Seller only)' })
    async create(@Request() req, @Body() body: CreateProductDto) {
        return this.productsService.create(req.user.id, body);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update product (Seller only)' })
    async update(@Request() req, @Param('id') id: string, @Body() body: UpdateProductDto) {
        return this.productsService.update(req.user.id, id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete product (Seller only)' })
    async delete(@Request() req, @Param('id') id: string) {
        return this.productsService.delete(req.user.id, id);
    }

    @Post(':id/images')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add images to product' })
    async addImages(@Request() req, @Param('id') id: string, @Body() body: AddProductImagesDto) {
        return this.productsService.addImages(id, body.imageUrls);
    }

    @Delete(':id/images/:imageId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove image from product' })
    async removeImage(@Request() req, @Param('id') id: string, @Param('imageId') imageId: string) {
        return this.productsService.removeImage(req.user.id, id, imageId);
    }

    @Patch(':id/stock')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SELLER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Toggle product stock status' })
    async toggleStock(@Request() req, @Param('id') id: string, @Body() body: ToggleStockDto) {
        return this.productsService.toggleStock(req.user.id, id, body.stock_status);
    }

    @Post(':id/view')
    @ApiOperation({ summary: 'Increment product view count' })
    async incrementViews(@Param('id') id: string) {
        return this.productsService.incrementViews(id);
    }

    @Post(':id/click')
    @ApiOperation({ summary: 'Increment product click count' })
    async incrementClicks(@Param('id') id: string) {
        return this.productsService.incrementClicks(id);
    }
}
