import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { CreateMessagesDto } from './dtos/create-messages.dto';

@Controller('messages')
export class MessagesController {


    @Get()
    listMessages(){
        console.log('Get Already')
    }

    @Post()
    createMessages(@Body() body: CreateMessagesDto, @Headers() header : any){
        console.log(`post request ${body.content}`)
    }

    @Get('/:id')
    getMessage(@Param('id') param : string){

        console.log('GetMessage ' + param)
    }

}
