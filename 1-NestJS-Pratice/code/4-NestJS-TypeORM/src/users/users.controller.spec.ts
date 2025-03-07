import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOneUser(id: number) {
        return Promise.resolve({
          id,
          email: 'dnjsxoghd@naver.com',
          password: 'q2tlxm@123',
        } as User);
      },
      findUser(email: string) {
        return Promise.resolve([{ id: 1, email, password: 'pppp' } as User]);
      },
      // removeUser(id : number){
      //   return Promise.resolve({id, email : 'dnjsxoghd@naver.com', password : 'q2tlxm@123'} as User)
      // },
      // updateUser(){}
    };
    fakeAuthService = {
      // signup(){},
      // signin(){}
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
