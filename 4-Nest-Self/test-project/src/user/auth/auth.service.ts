import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import {promisify} from 'util';

const scrypt = promisify(_scrypt)


@Injectable()
export class AuthService {
    constructor(private usersService : UserService){}
    async createUser(email : string, password : string, admin : boolean){
        const existingUser = await this.usersService.findUsers(email)

        if(existingUser.length){
            throw new BadRequestException('이미 존재하는 Email입니다.')
        }

        const salt = randomBytes(32).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const resultPassword = salt + '.' + hash.toString('hex');

        const user = await this.usersService.userCreate(email, resultPassword, admin)

        return user;
    }

    async signinUser(email : string, password : string){
        const matchUser = await this.usersService.findUsers(email)

        if(!matchUser){
            throw new BadRequestException('해당 이메일이 존재하지 않습니다.')
        }

        // salt와 .과 hash된 salt+password를 분리하는 코드입니다.
        const [salt, passedPassword] = matchUser[0].password.split('.')

        const hashPassword = (await scrypt(password , salt, 32)) as Buffer;


        if(passedPassword === hashPassword.toString('hex')){
            return matchUser
        } else {
            throw new BadRequestException('password not match')
        }


    }

    async deleteUser(id : number){
        return await this.usersService.deleteUser(id);
    }

    async updateUser(email : string, newestPassword : string, existingPassword : string){
        const matchUser = await this.usersService.findoneEmailUser(email);

        if(!matchUser){
            throw new BadRequestException('일치하는 이메일이 없습니다.')
        }

        const [salt, storedHashedPassword] = matchUser.password.split('.');

         const newHashedPassword = (await scrypt(existingPassword, salt, 32)) as Buffer;
        
         if(storedHashedPassword === newHashedPassword.toString('hex')){
                const newPassword = (await scrypt(newestPassword, salt, 32)) as Buffer;
                matchUser.password = salt + '.' + newPassword.toString('hex');
                const user =  await this.usersService.saveUser(matchUser);
                return user;
         } else {
            throw new BadRequestException('hashed화 중 에러 발생');
         }


    }

   
}