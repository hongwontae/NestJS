import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import { ReportEntity } from "./report.entity";
import { ReportController } from "./report.controller";

@Module({
    controllers : [ReportController],
    imports : [TypeOrmModule.forFeature([ReportEntity])],
})
export class ReportModule{
    
}