import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

let service : AuthService;

describe('AuthService', () => {
    beforeEach(async () => {
        // Create a fake copy of the users service
      const fakeUsersService : Partial<UsersService> = {
        findUser: () => Promise.resolve([]),
        createUser: (email: string, password: string) =>
          Promise.resolve({ id: 1, email, password } as User),
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
    })
    
    it('can create an instance of auth service', async () => {
      expect(service).toBeDefined();
    });

    it('create user', async ()=>{
        const user = await service.signup('dnjsxoghd@naver.com', 'asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })
    
})


