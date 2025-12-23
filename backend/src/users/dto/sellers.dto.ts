import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    store_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    whatsapp_number?: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    store_categories: string[];
}
