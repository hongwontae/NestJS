import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import {PowerModule} from '../power/power.module';
import { CpuModule } from 'src/cpu/cpu.module';

@Module({
  providers: [DiskService],
  imports : [PowerModule],
  exports : [DiskService]
})
export class DiskModule {}
