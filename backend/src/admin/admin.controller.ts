import { Controller, Get, Post, Param, Query, UseGuards, Request, Body, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getUploadPath } from '../common/utils/upload-utils';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get('stats')
    @ApiOperation({ summary: 'Get dashboard analytics' })
    async getStats() {
        return this.adminService.getDashboardStats();
    }

    // --- Banners ---
    @Get('banners')
    async getBanners() {
        return this.adminService.getBanners();
    }

    @Post('banners')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, getUploadPath('banners'));
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `banner-${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }))
    async createBanner(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const imageUrl = file ? `/uploads/banners/${file.filename}` : body.image_url;
        return this.adminService.createBanner({
            title: body.title,
            subtitle: body.subtitle,
            cta_text: body.cta_text,
            image_url: imageUrl,
        });
    }

    @Post('banners/:id/toggle')
    async toggleBanner(@Param('id') id: string, @Body('is_active') is_active: boolean) {
        return this.adminService.toggleBanner(id, is_active);
    }

    // --- Page Control ---
    @Get('page-controls')
    async getPageControls() {
        return this.adminService.getPageControls();
    }

    @Post('page-controls')
    async updatePageControl(@Body() body: any) {
        return this.adminService.updatePageControl(body.page, body.section, body.is_enabled, body.msg);
    }

    // --- Users ---
    @Get('users')
    async getUsers(@Query('role') role: string) {
        return this.adminService.getUsers(role);
    }

    @Post('users/:id/ban')
    async banUser(@Param('id') id: string) {
        return this.adminService.banUser(id);
    }

    @Post('users/:id/unban')
    async unbanUser(@Param('id') id: string) {
        return this.adminService.unbanUser(id);
    }

    // --- Riders ---
    @Get('riders')
    @ApiOperation({ summary: 'List riders (opt filter by status)' })
    async getRiders(@Query('status') status: string) {
        return this.adminService.getRiders(status);
    }

    @Post('verify-rider/:id')
    @ApiOperation({ summary: 'Verify a rider account' })
    async verifyRider(@Param('id') id: string) {
        return this.adminService.verifyRider(id);
    }

    // --- Inventory/Sellers ---
    @Get('inventory-stats')
    async getInventoryStats() {
        return this.adminService.getInventoryStats();
    }

    // --- Complaints ---
    @Get('complaints')
    async getComplaints(@Query('status') status: any) {
        return this.adminService.getComplaints(status);
    }

    @Post('complaints/:id/resolve')
    async resolveComplaint(@Param('id') id: string, @Body() body: any) {
        return this.adminService.resolveComplaint(id, body.response, body.status);
    }

    // --- Universities ---
    @Get('universities')
    async getUniversities() {
        return this.adminService.getUniversities();
    }

    @Post('universities')
    async createUniversity(@Body() body: any) {
        return this.adminService.createUniversity(body);
    }

    @Post('universities/:id')
    async updateUniversity(@Param('id') id: string, @Body() body: any) {
        return this.adminService.updateUniversity(id, body);
    }

    @Delete('universities/:id')
    async deleteUniversity(@Param('id') id: string) {
        return this.adminService.deleteUniversity(id);
    }

    // --- Categories ---
    @Get('categories')
    async getCategories() {
        return this.adminService.getCategories();
    }

    @Post('categories')
    async createCategory(@Body() body: any) {
        return this.adminService.createCategory(body);
    }

    @Post('categories/:id')
    async updateCategory(@Param('id') id: string, @Body() body: any) {
        return this.adminService.updateCategory(id, body);
    }

    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string) {
        return this.adminService.deleteCategory(id);
    }

    // --- Notifications ---
    @Get('notifications')
    @ApiOperation({ summary: 'Get past broadcast notifications' })
    async getNotifications() {
        return this.adminService.getNotifications();
    }

    @Post('notifications')
    @ApiOperation({ summary: 'Send a broadcast notification' })
    async sendNotification(@Body() body: { message: string; university_id?: string }) {
        return this.adminService.sendNotification(body.message, body.university_id);
    }
}
