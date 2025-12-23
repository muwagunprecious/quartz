import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use((req, res, next) => {
        console.log(`[Request] ${req.method} ${req.url}`);
        if (req.headers.authorization) {
            console.log(`[Request] Auth Header: ${req.headers.authorization.substring(0, 20)}...`);
        } else {
            console.log(`[Request] No Auth Header found`);
        }
        next();
    });

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            console.error('Validation Errors:', JSON.stringify(errors, null, 2));
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

    const port = 5003;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
