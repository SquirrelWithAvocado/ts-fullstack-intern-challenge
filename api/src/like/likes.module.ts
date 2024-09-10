import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikesService } from "./likes.service";
import { Like } from "src/entities";
import { LikesController } from "./likes.controller";
import { UsersModule } from "src/user/users.module";


@Module({
    imports:[UsersModule, TypeOrmModule.forFeature([Like])],
    controllers: [LikesController],
    providers: [LikesService]
})
export class LikesModule {}