import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
    constructor(private readonly universitiesService: UniversitiesService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create university (Admin only)' })
    create(@Body() createUniversityDto: CreateUniversityDto) {
        return this.universitiesService.create(createUniversityDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all universities (Public)' })
    findAll() {
        return this.universitiesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one university' })
    findOne(@Param('id') id: string) {
        return this.universitiesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update university (Admin only)' })
    update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
        return this.universitiesService.update(id, updateUniversityDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete university (Admin only)' })
    remove(@Param('id') id: string) {
        return this.universitiesService.remove(id);
    }
}
