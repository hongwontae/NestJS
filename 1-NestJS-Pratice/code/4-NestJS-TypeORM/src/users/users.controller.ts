import { Controller, Post, Body, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import { UsersService } from './users.service';
import {UpdateUserDto} from './dtos/update-users.dto';
import { parse } from 'path';

@Controller('auth')
export class UsersController {

    constructor(private userService : UsersService){}
    
    @Post('/signup')
    async createUser(@Body() body : CreateUserDto){
        const data =  await this.userService.createUser(body.email, body.password)
        console.log(data);
    }

    @Get('/:id')
    findUser(@Param('id') id : string){
        return this.userService.findOneUser(parseInt(id));
    }

    @Get()
    findAllUser(@Query('email') email : string){
        return this.userService.findUser(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id : string){
        return this.userService.removeUser(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto){
        this.userService.updateUser(parseInt(id), body)
    }

}
