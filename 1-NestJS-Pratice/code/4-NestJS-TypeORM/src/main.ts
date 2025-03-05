import { NestFactory } from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common'
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ['asdasdaasdasdsa']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : false
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
