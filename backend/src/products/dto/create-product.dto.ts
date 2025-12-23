import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StockStatus {
    IN_STOCK = 'IN_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category_id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    university_id?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    condition?: string;

    @ApiProperty({ enum: StockStatus, default: StockStatus.IN_STOCK })
    @IsOptional()
    @IsEnum(StockStatus)
    stock_status?: StockStatus;

    @ApiProperty()
    @IsArray()
    images: any[];

    @ApiProperty({ required: false, description: 'JSON string of product specs' })
    @IsOptional()
    @IsString()
    specifications?: string;
}
