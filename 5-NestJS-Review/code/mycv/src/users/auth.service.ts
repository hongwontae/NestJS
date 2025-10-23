import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import {promisify} from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService : UsersService){};

    async signup(email : string, password : string){
        const users = await this.usersService.find(email);

        if(users.length){
            throw new BadRequestException('email in use');
        }

        // random value를 통한 솔트 값 생성
        const salt = randomBytes(8).toString('hex');

        // password + salt를 함께 해시화
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // DB에서 password를 가져올 떄 salt를 알아볼 수 있게 구분자와 salt 값 추가
        const result = salt + '.' + hash.toString('hex');

        // 유저 생성하기
        const user = await this.usersService.create(email, result);

        return user;

    }

    async signin(email : string, password : string){
        const [user] = await this.usersService.find(email);

        if(!user){
            throw new NotFoundException('user not found');
        }

        const [salt, storedPassword] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedPassword !== hash.toString('hex')) {
            throw new BadRequestException('bad Password')
        } 

        return user
        
    }

}