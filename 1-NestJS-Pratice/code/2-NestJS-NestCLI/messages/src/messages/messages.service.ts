import {MessagesRepository} from './messages.repository';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MessagesService{


    constructor(public messageRepo : MessagesRepository){}

    findone(id : string){
        return this.messageRepo.findOne(id);
    }

    findAll(){
        return this.messageRepo.findAll();
    }

    create(contents : string){
        return this.messageRepo.create(contents)
    }

}