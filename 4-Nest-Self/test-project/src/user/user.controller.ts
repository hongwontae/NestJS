import {Body, Controller, Delete, Param, Patch, Post, Res, Session, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SigninUserDto } from './dto/signin-user-dto';
import {UpdateUserDto} from './dto/update-user-dto';
import {Response} from 'express';

@Controller('user')
export class UserController {

    constructor(private usersService : UserService, private authService : AuthService){}

    @Post('signup')
    @UsePipes(new ValidationPipe({transform : true, transformOptions : {exposeDefaultValues : true}}))
    async createUser(@Body() body : CreateUserDto){
        const user = await this.authService.createUser(body.email, body.password, body.admin);
        return user;
    }

    @Post('signin')
    @UsePipes(new ValidationPipe())
    async signinUser(@Body() body : SigninUserDto, @Session() session : any){
        console.log(body.password, body.email)
        const user = await this.authService.signinUser(body.email, body.password);
        session.email = user[0].email
        return user;
    }

    @Post('logout')
    async logoutUser(@Session() session : any, @Res() res : Response){
        session = null;
        res.clearCookie('session-hwt.sig', {path : '/'})
        res.clearCookie('session-hwt', {path : '/'})
        return res.json({ logout: 'logout' });
    }

    @Patch('update')
    @UsePipes(new ValidationPipe({transform : true}))
    async updateUser(@Body() body : UpdateUserDto, @Session() session : any, @Res() res : Response){
        session = null;
        res.clearCookie('session-hwt.sig', {path : '/'})
        res.clearCookie('session-hwt', {path : '/'})
        const updateUser = await this.authService.updateUser(body.email, body.password, body.existingPassword);
        return res.json(updateUser).status(200);
         
    }

    @Delete('remove/:id')
    async deleteUser(@Param('id') id : string){
        console.log(id)
        return await this.authService.deleteUser(parseInt(id))
    }


}