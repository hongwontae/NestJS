import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  // 타입은 Repository이고 제네릭은 User 타입입니다.
  // Repository 타입이 존재하고 동적으로 받기 위해 제네릭으로 User를 받아서
  // Repository의 타입을 완성시킵니다.
  // @InjectRepositry(User) => 의존성 주입 시스템에 사용자 레파지토리가 필요하다고 알립니다.
  // 의존성 주입 시스템은 제네릭으로 잘 작동하지 않습니다.

  // create => 정보를 가져와서 사용자 엔티티 인스턴스를 생성합니다.
  // save => 엔티티를 가져와서 DB에 저장하는 메서드입니다.
  async createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }

  findOneUser(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findUser(email: string) {
    return this.repo.find({ where: { email } });
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findOneUser(id);

    if(!user){
        throw new Error('user not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async removeUser(id : number) {
    const user = await this.repo.findOne({where : {id}});

    if(!user){
        throw new Error('user not found');
    }

    return this.repo.remove(user)

  }
}
