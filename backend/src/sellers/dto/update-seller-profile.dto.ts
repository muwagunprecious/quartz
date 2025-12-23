import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerProfileDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    store_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    whatsapp_number?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    store_categories?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    logo_url?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    banner_url?: string;
}
