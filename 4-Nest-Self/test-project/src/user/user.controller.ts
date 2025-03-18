import {Body, Controller, Delete, Param, Post, Session, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SigninUserDto } from './dto/signin-user-dto';

@Controller('user')
export class UserController {

    constructor(private usersService : UserService, private authService : AuthService){}

    @Post('signup')
    @UsePipes(new ValidationPipe({transform : true}))
    async createUser(@Body() body : CreateUserDto){
        const user = await this.authService.createUser(body.email, body.password, body.admin);
        return user;
    }

    @Post('signin')
    @UsePipes(new ValidationPipe())
    async signinUser(@Body() body : SigninUserDto, @Session() session : any){
        console.log(session)
        const user = await this.authService.signinUser(body.email, body.password);
        session.userId = 200
        return user;
    }

    @Delete('remove/:id')
    async deleteUser(@Param('id') id : string){
        console.log(id)
        return await this.authService.deleteUser(parseInt(id))
    }


}