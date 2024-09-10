import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "../entities/like.entity";
import { DeleteResult, Equal, Repository } from "typeorm";
import { CreateLikeDto } from "src/dtos";
import { UsersService } from "src/user/users.service";

@Injectable()
export class LikesService {
    private readonly apiUrl = 'https://cdn2.thecatapi.com/images/';

    constructor(
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
        private readonly usersService: UsersService
    ) { }

    async addLike(newLikeData: CreateLikeDto, token: string): Promise<Like> {
        const user = await this.usersService.getUserByToken(token);
        const catId = newLikeData.catId;

        if (await this.likesRepository.findOne({
            where: {
                user: { id: user.id },
                catId: catId
            },
        })) {
            throw new HttpException(
                `Cat with id: ${newLikeData.catId} already liked`,
                HttpStatus.METHOD_NOT_ALLOWED
            );
        }

        const newLike = new Like();

        newLike.catId = newLikeData.catId;
        newLike.imageUrl = `${this.apiUrl}${newLikeData.catId}.jpg`;
        newLike.createdAt = new Date();
        newLike.user = await this.usersService.getUserByToken(token);

        return this.likesRepository.save(newLike);
    }

    async findLikesByToken(token: string, page: number, limit: number): Promise<Like[]> {
        const user = await this.usersService.getUserByToken(token);
        const skip = Math.max(page - 1, 0) * limit;

        if (page < 0 || limit < 1) {
            throw new BadRequestException(`Invalid page or limit`)
        }
        
        return this.likesRepository.find({
            where: { user: { id: user.id } },
            skip: skip,
            take: limit
        });
    }

    async deleteLikeByCatId(catId: string, token: string): Promise<DeleteResult> {
        const user = await this.usersService.getUserByToken(token);
        return this.likesRepository.delete({ catId: Equal(catId), user: Equal(user.id) });
    }
}