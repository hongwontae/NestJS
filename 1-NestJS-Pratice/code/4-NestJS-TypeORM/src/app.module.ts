import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session');
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppDataSource } from './data-source';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User, Report]),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: false,
      }),
    },
  ],
})
export class AppModule {
  // App.module 애플리케이션으로 들어오는 트래픽을 수신할 떄
  // 자동으로 호출됩니다.
  constructor(private configService : ConfigService){}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')],
      })
    ).forRoutes('*')
  }
}
