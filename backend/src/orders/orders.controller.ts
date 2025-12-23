import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Create order' })
    async create(@Request() req, @Body() body: CreateOrderDto) {
        return this.ordersService.create(req.user.id, body);
    }

    @Get()
    @ApiOperation({ summary: 'Get user orders (buyer or seller)' })
    async findAll(@Request() req) {
        return this.ordersService.findAll(req.user.id, req.user.role);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order details' })
    async findOne(@Param('id') id: string, @Request() req) {
        return this.ordersService.findOne(id, req.user.id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update order status (Seller only)' })
    async updateStatus(@Param('id') id: string, @Request() req, @Body() body: UpdateOrderStatusDto) {
        return this.ordersService.updateStatus(id, req.user.id, body.status);
    }
}
