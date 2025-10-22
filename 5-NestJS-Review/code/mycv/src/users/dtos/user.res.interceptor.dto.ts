import {Expose} from 'class-transformer';

export class UserResInterceptorDto {

    @Expose()
    id : number;
    
    @Expose()
    email : string;
}