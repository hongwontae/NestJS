import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Report} from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo : Repository<Report>){}

    createEstimate({make, model, lng, lat, year, mileage} : GetEstimateDto){
        return this.repo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', {make})
        .andWhere('model = :model', {model})
        .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
        .andWhere('year - :year BETWEEN -3 AND 3', {year})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage})
        .limit(3)
        .getRawOne()
    }

    create(reportDto : CreateReportDto, user : User){
        // 객체 생성
        const report = this.repo.create(reportDto);
        // user 전체를 저장하는 것처럼 보이지만 id만 취합니다.
        report.user = user;
        // 실제 DB 저장
        return this.repo.save(report);
    }

    async changeApproval(id : string, approved : boolean){
        const report = await this.repo.findOne({where : {id : parseInt(id)}})

        if(!report){
            throw new NotFoundException('report not found');
        }

        report.approved = approved;

        return this.repo.save(report);

    }

}
