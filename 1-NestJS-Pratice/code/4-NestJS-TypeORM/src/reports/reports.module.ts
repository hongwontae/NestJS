import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Report} from './report.entity';

@Module({
  controllers: [ReportsController],
  imports : [TypeOrmModule.forFeature([Report])]
})
export class ReportsModule {}
