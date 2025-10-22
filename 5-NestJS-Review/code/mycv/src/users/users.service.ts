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

    findOne(id : number){
        return this.repo.findOne({where : {id}})
    }

    find(email : string){
        return this.repo.find({where : {email}})
    }

    async update(id : number, attrs : Partial<UsersEntity>){
        const user = await this.repo.findOneBy({id});
        if (!user) {
            throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);

    }

    async remove(id : number){
        const user = await this.repo.findOneBy({id});
        if (!user) {
            throw new Error('deleted user not found');
        }
        return this.repo.remove(user);
    }


}
