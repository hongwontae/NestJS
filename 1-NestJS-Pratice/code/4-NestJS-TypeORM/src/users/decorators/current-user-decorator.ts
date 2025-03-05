import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data : never, context : ExecutionContext)=>{
    // context는 다양한 request를 담습니다. (request graphql, , http, websocket..)
    // 정보를 가공하고 반환할 것입니다.
    // data는 데코레이터 인자의 데이터입니다.

    // 요청 접근
    const request = context.switchToHttp().getRequest();

    console.log(request.session.userId);

    return 'hi there'

})