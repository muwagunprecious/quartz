import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RidersController } from './riders.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [RidersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
