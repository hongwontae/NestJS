import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

interface AcceptUserData {
    email : string;
    password : string;
    admin : boolean
}

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private repo : Repository<UserEntity>){}

    async createUser({email, password, admin} : AcceptUserData){
        const userData = this.repo.create({email, password, admin})
        return await this.repo.save(userData);
    }

}
