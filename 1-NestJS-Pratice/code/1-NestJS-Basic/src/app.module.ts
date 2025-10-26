import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsssController } from './usss/usss.controller';
import { UserController } from './user.controller';
import { UserController } from './user.controller';
import { UssssModule } from './ussss/ussss.module';
import { UsssService } from './usss/usss.service';
import { UssssController } from './ussss/ussss.controller';
import { UsssController } from './usss/usss.controller';

@Module({
    controllers : [AppController, UsssController, UssssController, UserController],
    providers: [UsssService],
    imports: [UssssModule]
})
export class AppModule{

}