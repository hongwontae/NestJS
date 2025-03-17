import {DataSource} from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

export const AppDataSource = new DataSource({
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'user',
    password : 'password',
    database : 'mydb',
    entities : [Report, User],
    migrations : ['src/migrations/*.ts'],
    synchronize : false,
    logging : true
});