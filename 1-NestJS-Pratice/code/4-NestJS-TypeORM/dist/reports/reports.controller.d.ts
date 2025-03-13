import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from 'src/users/user.entity';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createPost(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
}
