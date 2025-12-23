import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NegotiateResponseDto {
    @ApiProperty({ description: 'Accept or decline negotiation' })
    @IsBoolean()
    accept: boolean;
}

export class UpdateDeliveryStatusDto {
    @ApiProperty({ description: 'New delivery status' })
    status: string;
}

export class VerifyCodeDto {
    @ApiProperty({ description: 'Verification code' })
    code: string;
}

export class NegotiatePriceDto {
    @ApiProperty({ description: 'Proposed price' })
    @IsNumber()
    price: number;
}

export class CreateDeliveryDto {
    @ApiPropertyOptional({ description: 'Order ID (optional)' })
    @IsOptional()
    order_id?: string;

    @ApiPropertyOptional({ description: 'Item name (for generic requests)' })
    @IsOptional()
    item_name?: string;

    @ApiPropertyOptional({ description: 'Offered delivery price' })
    @IsOptional()
    @IsNumber()
    offered_price?: number;

    @ApiPropertyOptional({ description: 'Pickup address' })
    @IsOptional()
    pickup_address?: string;

    @ApiPropertyOptional({ description: 'Pickup contact' })
    @IsOptional()
    pickup_contact?: string;

    @ApiPropertyOptional({ description: 'Dropoff address' })
    @IsOptional()
    dropoff_address?: string;
}
