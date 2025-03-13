import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Report} from './report.entity';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  imports : [TypeOrmModule.forFeature([Report])],
  providers : [ReportsService]
})
export class ReportsModule {}
