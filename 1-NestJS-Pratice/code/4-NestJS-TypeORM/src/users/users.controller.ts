import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-users.dto';
import {Serialize} from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto'; 
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService, private authService : AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log('createUser')
    return this.authService.signup(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running')
    const user = await this.userService.findOneUser(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.findUser(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.userService.updateUser(parseInt(id), body);
  }
}
