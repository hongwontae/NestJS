import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    getEstimate(query: GetEstimateDto): Promise<any>;
    createPost(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
    approvedReport(id: string, body: ApproveReportDto): Promise<import("./report.entity").Report>;
}
