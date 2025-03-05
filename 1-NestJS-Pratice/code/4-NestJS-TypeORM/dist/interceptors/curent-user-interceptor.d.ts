import { NestInterceptor } from '@nestjs/common';
import { UsersService } from '../users/users.service';
export declare class CurrentUserInterceptor implements NestInterceptor {
    private userService;
    constructor(userService: UsersService);
}
