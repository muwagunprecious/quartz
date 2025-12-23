import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: 'Internal server error' };

        // Clean up message for production
        const responseBody = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(typeof message === 'object' ? message : { message }),
        };

        if (process.env.NODE_ENV !== 'production') {
            console.error('[Exception]', exception);
        }

        response.status(status).json(responseBody);
    }
}
