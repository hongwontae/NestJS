import {CanActivate, ExecutionContext} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthClass implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        // id가 존재한다면 true
        // id가 없다면 falsy 값 false
        return request.session.userId;
    }
}