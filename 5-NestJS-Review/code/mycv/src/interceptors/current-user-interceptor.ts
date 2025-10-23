import { NestInterceptor, ExecutionContext, CallHandler, Injectable, UseInterceptors} from '@nestjs/common';

interface ClassConstructor {
    new (...args : any[]) : {}
}


export function CurrentUserInt(service : ClassConstructor ){
    return UseInterceptors(new CurrentUserInterceptor(service))
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private service : any){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if(userId) {
            const user = await this.service.findOne(userId);
            request.currentUser = user;
        }

        return next.handle();
    }
}