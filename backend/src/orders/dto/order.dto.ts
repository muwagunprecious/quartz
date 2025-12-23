import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DeliveryOption {
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export class CreateOrderDto {
    @ApiProperty({ description: 'Product ID' })
    @IsString()
    product_id: string;

    @ApiProperty({ description: 'Quantity', default: 1 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Delivery option', enum: DeliveryOption })
    @IsEnum(DeliveryOption)
    delivery_option: DeliveryOption;

    @ApiPropertyOptional({ description: 'Delivery fee if applicable' })
    @IsNumber()
    @IsOptional()
    delivery_fee?: number;

    @ApiPropertyOptional({ description: 'Pickup/delivery address' })
    @IsString()
    @IsOptional()
    delivery_address?: string;

    @ApiPropertyOptional({ description: 'Contact for delivery' })
    @IsString()
    @IsOptional()
    delivery_contact?: string;

    @ApiPropertyOptional({ description: 'Auto-create delivery request', default: false })
    @IsBoolean()
    @IsOptional()
    create_delivery_request?: boolean;

    @ApiPropertyOptional({ description: 'Offered delivery price if creating delivery request' })
    @IsNumber()
    @IsOptional()
    offered_delivery_price?: number;
}

export class UpdateOrderStatusDto {
    @ApiProperty({ description: 'New order status', enum: OrderStatus })
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
