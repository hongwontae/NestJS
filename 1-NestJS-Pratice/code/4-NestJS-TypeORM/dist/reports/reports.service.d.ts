import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
}
