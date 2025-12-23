import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
        MulterModule.register({
            limits: {
                fileSize: parseInt(process.env.UPLOAD_MAX_FILE_SIZE || '5242880'), // 5MB
            },
        }),
    ],
    controllers: [UploadsController],
    providers: [UploadsService],
    exports: [UploadsService],
})
export class UploadsModule { }
