import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      // TypeOrm 설정 동안 ConfigSevice 인스턴스에 접근한다는 의미입니다.
      inject : [ConfigService],
      useFactory : (config : ConfigService)=>{
        // 의존성 주입
        return {
          type : 'sqlite',
          database : config.get<string>('DB_NAME'),
          synchronize : true,
          entities : [User,Report]
        }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: '',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['asdasda'],
      })
    ).forRoutes('*')
  }
}
