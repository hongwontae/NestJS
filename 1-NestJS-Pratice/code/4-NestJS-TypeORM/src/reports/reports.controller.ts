import { Body, Controller,Post, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import {ReportsService} from './reports.service';
import {AuthClass} from '../users/gaurd/auth.gaurd';
import { CurrentUser } from 'src/users/decorators/current-user-decorator'; 
import { User } from 'src/users/user.entity';
import {Serialize} from '../interceptors/serialize.interceptor';
import {ReportDto} from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-dto';
import { AdminGaurd } from 'src/guard/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService : ReportsService){}

    @Get('')
    getEstimate(@Query() query : GetEstimateDto){
        return this.reportsService.createEstimate(query)
    }

    @Post('')
    @UseGuards(AuthClass)
    @Serialize(ReportDto)
    async createPost(@Body() body : CreateReportDto, @CurrentUser() user : User){
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGaurd)
    approvedReport(@Param('id') id : string, @Body() body : ApproveReportDto){
        return this.reportsService.changeApproval(id, body.approved)
    }
}
