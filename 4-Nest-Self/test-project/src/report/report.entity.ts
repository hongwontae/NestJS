import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    description : string;

    @Column()
    price : number;

    @Column()
    lng : number

    @Column()
    lat : number
}