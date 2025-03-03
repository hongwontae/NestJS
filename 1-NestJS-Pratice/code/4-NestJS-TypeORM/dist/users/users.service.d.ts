import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    createUser(email: string, password: string): Promise<User>;
    findOneUser(id: number): Promise<User | null>;
    findUser(email: string): Promise<User[]>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
    removeUser(id: number): Promise<User>;
}
