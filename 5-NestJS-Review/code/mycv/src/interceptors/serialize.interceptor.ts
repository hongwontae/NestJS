import {UseInterceptors, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';

interface ClassConstructor {
    new (...args : any[]) : {}
}

export function Serialize(dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto : any){}
    
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // 요청이 도달하기 전 실행되는 인터셉터
        console.log(context.getClass());
        console.log(context.getHandler());
        console.log('intercept');
        
        return handler.handle().pipe(
            map((data : any)=>{
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues : true
                })
            })
        )
    }

}