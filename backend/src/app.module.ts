import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'uploads'),
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
    providers: [],
})
export class AppModule { }
