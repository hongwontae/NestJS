import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import {MessagesService} from './messages.service';

@Controller('messages')
export class MessagesController {

    messagesService : MessagesService

    constructor(){
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages(){
        return this.messagesService.findAll();
    };

    @Post()
    createMessage(@Body() body : CreateMessageDto){
        return this.messagesService.create(body.content);
    };

    @Get('/:id')
    async getMessages(@Param('id') id : string){
        const message = await  this.messagesService.findone(id);
        if(!message){
            throw new NotFoundException('error');
        }
        return message;
    };

}
