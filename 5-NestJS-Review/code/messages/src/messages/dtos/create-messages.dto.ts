import {IsString, isString} from 'class-validator';


export class CreateMessagesDto {

    @IsString()
    content : string;
}