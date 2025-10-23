import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/user.update.dto';
import {UserResInterceptorDto} from './dtos/user.res.interceptor.dto';
import {Serialize} from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService, private authService : AuthService) {}

  @Serialize(UserResInterceptorDto)
  @Post('/signup')
  async createUser(@Body() body: UserDto, @Session() session : any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Serialize(UserResInterceptorDto)
  @Post('/signin')
  async siginin(@Body() body : UserDto, @Session() session : any){
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Serialize(UserResInterceptorDto)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('finduser handler running')
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
