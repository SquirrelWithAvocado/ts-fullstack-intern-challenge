import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from 'crypto';
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    private readonly salt = 'salt';

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    generateToken(userId: string): string {
        const hash = crypto.createHash('sha256');
        const data = userId + this.salt;

        hash.update(data, 'utf-8');
        return hash.digest('hex');
    }

    async validateToken(token: string): Promise<boolean> {  
        return true;
    }
}