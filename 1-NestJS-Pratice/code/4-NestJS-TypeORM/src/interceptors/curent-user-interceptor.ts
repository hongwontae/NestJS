import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService : UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if(userId){
            const user = await this.userService.findOneUser(userId);
            request.currentUser = user;
        }


        return handler.handle();
    }


}