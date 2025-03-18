import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async userCreate(email: string, password: string, admin: boolean) {
    const user = this.repo.create({ email, password, admin });
    return await this.repo.save(user);
  }

  async findUsers(email : string) {
    const users = await this.repo.find({where : {email}});
    return users;
  }

  async findOneUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    return user;
  }

  async updateUser(
    id: number,
    email: string,
    password: string,
    admin: boolean,
  ) {
    const user = await this.repo.findOne({ where: { id } });

    if (user) {
      user.email = email;
      user.password = password;
      user.admin = admin;
      return await this.repo.save(user);
    }
  }

  async deleteUser(id : number){
    return await this.repo.delete({id : id})
  }
}
