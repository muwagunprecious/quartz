import { IsBoolean, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum RiderValidationStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED'
}

export class UpdateRiderStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_online: boolean;
}

export class VerifyRiderDto {
    @ApiProperty({ enum: RiderValidationStatus })
    @IsNotEmpty()
    @IsEnum(RiderValidationStatus)
    validation_status: RiderValidationStatus;
}

export class UpdateVerificationDto {
    @ApiProperty()
    @IsNotEmpty()
    document_type: string; // 'NIN' | 'STUDENT_ID'

    @ApiProperty()
    @IsNotEmpty()
    document_url: string;
}
