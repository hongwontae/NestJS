import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor{
    new (...args : any[]) : {}
}

export function Serialize(dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : any){}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {

    // 요청이 처리되기 전에 인터셉트
    // console.log('Im running before the handler',context);

    return handler.handle().pipe(
        map((data : any)=>{
            // 응답이 나가기 전에 인터셉트
            // console.log('Im Running before response is snet out', data);
            return plainToClass(this.dto, data, {
                excludeExtraneousValues : true
            });
        })
    )
  }
}
