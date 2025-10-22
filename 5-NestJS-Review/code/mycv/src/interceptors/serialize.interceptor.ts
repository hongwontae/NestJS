import {UseInterceptors, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor{
    
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // 요청이 도달하기 전 실행되는 인터셉터
        console.log('context! '+ context);
        
        return handler.handle().pipe(
            map((data : any)=>{
                // 응답이 나가기 전에 실행되는 인터셉터
                console.log("i'm running before response is send out " + data)
            })
        )
    }

}