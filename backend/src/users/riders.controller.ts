import { Controller, Get, Patch, Body, UseGuards, Request, BadRequestException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRiderStatusDto, VerifyRiderDto, UpdateVerificationDto } from './dto/riders.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('riders')
@ApiBearerAuth()
@Controller('riders')
export class RidersController {
    constructor(private prisma: PrismaService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiOperation({ summary: 'Get current rider profile' })
    async getProfile(@Request() req) {
        // Access control: Ensure role is RIDER?

        const profile = await this.prisma.riderProfile.findUnique({
            where: { user_id: req.user.id },
            include: { user: true, university: true }
        });

        if (!profile) {
            throw new BadRequestException('Rider profile not found');
        }
        return profile;
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('status')
    @ApiOperation({ summary: 'Toggle Rider Online/Offline Status' })
    async updateStatus(@Request() req, @Body() dto: UpdateRiderStatusDto) {
        return this.prisma.riderProfile.update({
            where: { user_id: req.user.id },
            data: { is_online: dto.is_online }
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('verification')
    @ApiOperation({ summary: 'Submit Verification Documents' })
    async updateVerification(@Request() req, @Body() dto: UpdateVerificationDto) {
        return this.prisma.riderProfile.update({
            where: { user_id: req.user.id },
            data: {
                verification_document_type: dto.document_type,
                verification_document_url: dto.document_url,
                verification_status: 'PENDING' // Reset to pending if re-uploading
            }
        });
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Patch(':id/verify')
    @ApiOperation({ summary: 'Verify or Reject a Rider (Admin only)' })
    async verifyRider(@Param('id') id: string, @Body() dto: VerifyRiderDto) {
        return this.prisma.riderProfile.update({
            where: { id },
            data: { verification_status: dto.validation_status }
        });
    }
}
