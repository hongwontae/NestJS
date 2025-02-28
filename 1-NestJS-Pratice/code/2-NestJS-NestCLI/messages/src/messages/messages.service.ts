import {MessagesRepository} from './messages.repository';

export class MessagesService{

    messageRepo : MessagesRepository

    constructor(){
        this.messageRepo = new MessagesRepository();
    }

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