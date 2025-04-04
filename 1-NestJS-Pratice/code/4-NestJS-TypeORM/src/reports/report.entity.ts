import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({default : false})
    approved : boolean

    @Column()
    price : number;

    @Column()
    make : string; // 제조사

    @Column()
    model : string; // 실제 모델 (머스탱..)

    @Column()
    year : number;

    @Column()
    lng : number;

    @Column()
    lat : number;

    @Column()
    mileage : number;

    @ManyToOne(()=> User, (user)=> user.reports)
    user : User;

}