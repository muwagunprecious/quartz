import { Controller, Post, Body, UseInterceptors, UploadedFiles, UseGuards, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
    constructor(private uploadsService: UploadsService) { }

    @Post('presign')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Generate presigned S3 URLs for file upload' })
    async generatePresignedUrls(@Body() body: { fileNames: string[] }) {
        if (!body.fileNames || body.fileNames.length === 0) {
            throw new BadRequestException('File names are required');
        }
        return this.uploadsService.generatePresignedUrls(body.fileNames);
    }

    @Post('images')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads/misc',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'misc-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    @ApiOperation({ summary: 'Upload generic images' })
    async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
        return this.handleUploads(files, 'misc');
    }

    @Post('profiles')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FilesInterceptor('images', 1, {
        storage: diskStorage({
            destination: './uploads/profiles',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'profile-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    @ApiOperation({ summary: 'Upload profile image' })
    async uploadProfile(@UploadedFiles() files: Express.Multer.File[]) {
        return this.handleUploads(files, 'profiles');
    }

    @Post('banners')
    @UseGuards(AuthGuard('jwt')) // Admin guard to be added later
    @ApiBearerAuth()
    @UseInterceptors(FilesInterceptor('images', 1, {
        storage: diskStorage({
            destination: './uploads/banners',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'banner-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    @ApiOperation({ summary: 'Upload banner image' })
    async uploadBanner(@UploadedFiles() files: Express.Multer.File[]) {
        return this.handleUploads(files, 'banners');
    }

    @Post('products')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FilesInterceptor('images', 5, {
        storage: diskStorage({
            destination: './uploads/products',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'product-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    @ApiOperation({ summary: 'Upload product images' })
    async uploadProduct(@UploadedFiles() files: Express.Multer.File[]) {
        console.log('[UploadsController] uploadProduct called. Files count:', files?.length);
        return this.handleUploads(files, 'products');
    }

    @Post('riders/verification')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FilesInterceptor('images', 1, {
        storage: diskStorage({
            destination: './uploads/documents',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'doc-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    @ApiOperation({ summary: 'Upload rider verification document (NIN/ID)' })
    async uploadRiderDoc(@UploadedFiles() files: Express.Multer.File[]) {
        return this.handleUploads(files, 'documents');
    }

    private handleUploads(files: Express.Multer.File[], folder: string) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        const urls = files.map(file => ({
            filename: file.filename,
            url: `${process.env.APP_URL || 'http://localhost:5003'}/uploads/${folder}/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype,
        }));

        return { files: urls };
    }
}
