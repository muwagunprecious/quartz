import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { GatewayModule } from './gateway/gateway.module';
import { UploadsModule } from './uploads/uploads.module';
import { AdminModule } from './admin/admin.module';
import { OrdersModule } from './orders/orders.module';
import { PublicModule } from './public/public.module';
import { UniversitiesModule } from './universities/universities.module';
import { CategoriesModule } from './categories/categories.module';
import { SellersModule } from './sellers/sellers.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 100,
        }]),
        ServeStaticModule.forRoot({
            rootPath: process.env.UPLOAD_PATH || join(process.cwd(), 'uploads'),
            serveRoot: '/uploads',
        }),
        PrismaModule,
        AuthModule,
        UsersModule,
        ProductsModule,
        DeliveriesModule,
        OrdersModule,
        GatewayModule,
        UploadsModule,
        AdminModule,
        PublicModule,
        UniversitiesModule,
        CategoriesModule,
        SellersModule,
        ReviewsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule { }
