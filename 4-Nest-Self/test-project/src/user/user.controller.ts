import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private usersService : UserService){}

    @UsePipes(new ValidationPipe({transform : true}))
    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        return this.usersService.createUser(body)
    }
}