import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum StockStatus {
    IN_STOCK = 'IN_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export class UpdateProductDto {
    @ApiPropertyOptional({ description: 'Product title' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ description: 'Product description' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'Product price' })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({ description: 'Product condition' })
    @IsString()
    @IsOptional()
    condition?: string;

    @ApiPropertyOptional({ description: 'Stock status', enum: StockStatus })
    @IsEnum(StockStatus)
    @IsOptional()
    stock_status?: StockStatus;

    @ApiPropertyOptional({ description: 'WhatsApp number' })
    @IsString()
    @IsOptional()
    whatsapp_number?: string;

    @ApiPropertyOptional({ description: 'Category ID' })
    @IsString()
    @IsOptional()
    category_id?: string;

    @ApiPropertyOptional({ description: 'Published status' })
    @IsBoolean()
    @IsOptional()
    is_published?: boolean;

    @ApiPropertyOptional({ description: 'Product specifications (JSON string)' })
    @IsString()
    @IsOptional()
    specifications?: string;
}

export class AddProductImagesDto {
    @ApiProperty({ description: 'Array of image URLs', type: [String] })
    @IsArray()
    @IsString({ each: true })
    imageUrls: string[];
}

export class ToggleStockDto {
    @ApiProperty({ description: 'Stock status', enum: StockStatus })
    @IsEnum(StockStatus)
    stock_status: StockStatus;
}
