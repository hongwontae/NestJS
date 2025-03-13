import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Report} from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo : Repository<Report>){}

    create(reportDto : CreateReportDto, user : User){
        // 객체 생성
        const report = this.repo.create(reportDto);
        // user 전체를 저장하는 것처럼 보이지만 id만 취합니다.
        report.user = user;
        // 실제 DB 저장
        return this.repo.save(report);
    }

}
