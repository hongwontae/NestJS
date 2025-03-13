import { Body, Controller,Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import {ReportsService} from './reports.service';
import {AuthClass} from '../users/gaurd/auth.gaurd';
import { CurrentUser } from 'src/users/decorators/current-user-decorator'; 
import { User } from 'src/users/user.entity';
import {Serialize} from '../interceptors/serialize.interceptor';
import {ReportDto} from './dtos/report.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService : ReportsService){}

    @Post('')
    @UseGuards(AuthClass)
    @Serialize(ReportDto)
    async createPost(@Body() body : CreateReportDto, @CurrentUser() user : User){
        return this.reportsService.create(body, user);
    }
}
