import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
    private s3Client: S3Client;
    private uploadMode: string;

    constructor() {
        this.uploadMode = process.env.UPLOAD_MODE || 'local';

        if (this.uploadMode === 's3') {
            this.s3Client = new S3Client({
                region: process.env.AWS_REGION || 'us-east-1',
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                },
            });
        }
    }

    /**
     * Generate presigned URLs for S3 upload
     */
    async generatePresignedUrls(fileNames: string[]): Promise<{ fileName: string; uploadUrl: string; publicUrl: string }[]> {
        if (this.uploadMode !== 's3') {
            throw new BadRequestException('S3 upload mode not enabled');
        }

        const bucket = process.env.AWS_S3_BUCKET || '';
        const baseUrl = process.env.AWS_S3_URL || '';

        const urls = await Promise.all(
            fileNames.map(async (fileName) => {
                const key = `products/${Date.now()}-${fileName}`;
                const command = new PutObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    ContentType: this.getContentType(fileName),
                });

                const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                const publicUrl = `${baseUrl}/${key}`;

                return { fileName, uploadUrl, publicUrl };
            })
        );

        return urls;
    }

    /**
     * Get local file URL
     */
    getLocalFileUrl(filename: string): string {
        const baseUrl = process.env.UPLOAD_LOCAL_URL || 'http://localhost:5000/uploads';
        return `${baseUrl}/${filename}`;
    }

    /**
     * Validate uploaded files
     */
    validateFiles(files: Express.Multer.File[]): void {
        const maxFiles = parseInt(process.env.UPLOAD_MAX_FILES || '10');

        if (files.length > maxFiles) {
            throw new BadRequestException(`Maximum ${maxFiles} files allowed`);
        }

        const maxSize = parseInt(process.env.UPLOAD_MAX_FILE_SIZE || '5242880');
        const invalidFiles = files.filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            throw new BadRequestException('One or more files exceed maximum size');
        }
    }

    /**
     * Delete local file
     */
    deleteLocalFile(filename: string): void {
        const uploadPath = process.env.UPLOAD_LOCAL_PATH || './uploads';
        const filePath = path.join(uploadPath, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    /**
     * Get content type from filename
     */
    private getContentType(filename: string): string {
        const ext = path.extname(filename).toLowerCase();
        const contentTypes: { [key: string]: string } = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
        };
        return contentTypes[ext] || 'application/octet-stream';
    }
}
