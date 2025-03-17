import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {

    @UsePipes(new ValidationPipe({transform : true}))
    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        console.log(body)
    }
}