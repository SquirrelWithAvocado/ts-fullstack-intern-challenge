import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    addNewUser(newUser: User): Promise<User> {
        return this.usersRepository.save(newUser);
    }

    updateUser(updateUser: User): Promise<User> {
        return this.usersRepository.save(updateUser);
    }

    getUserById(id: string): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    getUserByToken(token: string): Promise<User> {
        if (!token) {
            throw new UnauthorizedException();
        }

        const user = this.usersRepository.findOneBy({ token });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    deleteUser(user: User): Promise<DeleteResult> {
        return this.usersRepository.delete(user);
    }
}