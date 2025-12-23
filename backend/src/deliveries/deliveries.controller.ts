import { Controller, Post, Get, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { DeliveriesService, DeliveryStatus } from './deliveries.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateDeliveryDto, NegotiatePriceDto, NegotiateResponseDto, UpdateDeliveryStatusDto, VerifyCodeDto } from './dto/delivery.dto';

@ApiTags('deliveries')
@Controller('deliveries')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DeliveriesController {
    constructor(private deliveriesService: DeliveriesService) { }

    @Post()
    @ApiOperation({ summary: 'Create delivery request' })
    create(@Request() req, @Body() body: CreateDeliveryDto) {
        return this.deliveriesService.createRequest(body.order_id, body.offered_price || 0, req.user.id, body.pickup_address, body.dropoff_address, body.item_name);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get delivery details' })
    getOne(@Param('id') id: string, @Request() req) {
        return this.deliveriesService.findOne(id, req.user.id);
    }

    @Get('pending')
    @ApiOperation({ summary: 'Get pending deliveries (Rider only)' })
    findAllPending(@Request() req) {
        // Check if rider
        return this.deliveriesService.findAllPending(req.user.university_id);
    }

    @Post(':id/accept')
    @ApiOperation({ summary: 'Rider accepts delivery' })
    accept(@Param('id') id: string, @Request() req) {
        return this.deliveriesService.acceptRequest(id, req.user.id);
    }

    @Post(':id/negotiate')
    @ApiOperation({ summary: 'Rider proposes new price' })
    negotiate(@Param('id') id: string, @Request() req, @Body() body: NegotiatePriceDto) {
        return this.deliveriesService.negotiate(id, req.user.id, body.price);
    }

    @Post(':id/negotiate/respond')
    @ApiOperation({ summary: 'Buyer responds to negotiation' })
    respondToNegotiation(@Param('id') id: string, @Request() req, @Body() body: NegotiateResponseDto) {
        return this.deliveriesService.respondToNegotiation(id, req.user.id, body.accept);
    }

    @Post(':id/verify-code')
    @ApiOperation({ summary: 'Rider verifies code to complete delivery' })
    verify(@Param('id') id: string, @Body() body: VerifyCodeDto) {
        return this.deliveriesService.verifyCode(id, body.code);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update status (Picked Up, On Way, At Gate)' })
    updateStatus(@Param('id') id: string, @Request() req, @Body() body: UpdateDeliveryStatusDto) {
        return this.deliveriesService.updateStatus(id, body.status as DeliveryStatus, req.user.id);
    }

    @Post(':id/cancel')
    @ApiOperation({ summary: 'Cancel delivery request' })
    cancel(@Param('id') id: string, @Request() req) {
        return this.deliveriesService.cancelDelivery(id, req.user.id);
    }
}
