import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';

export enum UserRole {
    STUDENT = 'STUDENT',
    SELLER = 'SELLER',
    RIDER = 'RIDER',
    ADMIN = 'ADMIN',
}

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    university_id?: string;

    @IsOptional()
    @IsString()
    whatsapp_number?: string;

    // Rider specific
    @IsOptional()
    @IsString()
    nin?: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
