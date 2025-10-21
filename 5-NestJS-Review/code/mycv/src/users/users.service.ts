import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private repo : Repository<UsersEntity>){}

    create(email : string, password : string){
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }


}
