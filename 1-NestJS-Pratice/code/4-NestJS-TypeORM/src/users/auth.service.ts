import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';

// randomBytes는 slat 값을 얻기 위해서
// scrypt는 해시ㄱ 처리를 할 때 
import { randomBytes, scrypt as _scrypt } from 'crypto';
// 콜백 함수를 promise를 이용하는 함수로 만들어줍니다.
import { promisify } from 'util';

// TS가 무엇을 반환할지 잘 모릅니다.
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService : UsersService){}

    async signup(email : string, password : string){
        const users = await this.userService.findUser(email);

        if(users.length){
            throw new BadRequestException('email in use!')
        }

        // salt 임의의 문자열 생성
        const salt = randomBytes(8).toString('hex');

        // 해시 처리
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        
        const user = await this.userService.createUser(email, result);

        return user;

    }

    async signin(email : string, password : string){
        const [user] = await this.userService.findUser(email);

        if(!user){
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash]  = user.password.split('.');

        const hash = (await scrypt(password, salt, 32) ) as Buffer;

        if(storedHash === hash.toString('hex')){
            return user;
        } else {
            throw new BadRequestException('bad password')
        }

    }

}