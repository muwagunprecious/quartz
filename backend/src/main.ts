import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { initUploadDirectories } from './common/utils/upload-utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Initialize upload directories
    initUploadDirectories();

    app.useGlobalFilters(new AllExceptionsFilter());

    // Security: Configure CORS
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    app.enableCors({
        origin: [frontendUrl, 'http://localhost:3000', 'https://campusmart-frontend.onrender.com'],
        credentials: true,
    });

    app.setGlobalPrefix('api');

    // Logging (Only in non-production)
    if (process.env.NODE_ENV !== 'production') {
        app.use((req, res, next) => {
            console.log(`[Request] ${req.method} ${req.url}`);
            if (req.headers.authorization) {
                console.log(`[Request] Auth Header: ${req.headers.authorization.substring(0, 20)}...`);
            }
            next();
        });
    }

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Validation Errors:', JSON.stringify(errors, null, 2));
            }
            return new BadRequestException(errors);
        }
    }));

    const config = new DocumentBuilder()
        .setTitle('CampusMart API')
        .setDescription('The CampusMart API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 5003;
    await app.listen(port);
    console.log(`Application is running on port: ${port}`);
}
bootstrap();
