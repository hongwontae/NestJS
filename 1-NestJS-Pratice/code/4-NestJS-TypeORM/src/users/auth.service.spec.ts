import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users : User[] = [];
    fakeUsersService = {
      findUser: (email: string) => {
        const user = users.filter((ele) => ele.email === email);
        return Promise.resolve(user);
      },
      createUser: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as User;
        users.push(user); // 새 유저 추가
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('throws an error if email is already in use', async () => {
    await service.signup('dnjsxoghd@naver.com', 'q2tlxm@123');

    await expect(
      service.signup('dnjsxoghd@naver.com', 'q2tlxm@123'),
    ).rejects.toThrow(BadRequestException); 
  });
});