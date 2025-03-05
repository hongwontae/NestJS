import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService : UsersService){}
}