import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { AuthService } from "./auth/auth.service";

@Module({
    controllers : [UserController],
    imports : [TypeOrmModule.forFeature([UserEntity])],
    providers : [UserService, AuthService]
})
export class UserModule {}