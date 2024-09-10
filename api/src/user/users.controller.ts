import { Controller, Delete, Post, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities";
import { AuthService } from "src/user/auth/auth.service";
import { DeleteResult } from "typeorm";

@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Post()
    async registerNewUser(@Req() req): Promise<User> {
        const token = req.headers['x-auth-token'];
        const alreadyExitstsUser = await this.usersService.getUserByToken(token);
        
        if (alreadyExitstsUser) {
            return alreadyExitstsUser;
        }

        const newUser = await this.usersService.addNewUser({ ...new User(), ...{ token: '' } });
        newUser.token = this.authService.generateToken(newUser.id);

        return this.usersService.updateUser(newUser);
    }

    @Delete()
    async deleteUser(@Req() req): Promise<DeleteResult> {
        const token = req.headers['x-auth-token'];
        return this.usersService.deleteUser(await this.usersService.getUserByToken(token));
    }
}