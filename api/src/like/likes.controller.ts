import { Body, Controller, Delete, Get, Param, Post, Query, Req } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { Like } from "src/entities";
import { CreateLikeDto } from "src/dtos";
import { DeleteResult } from "typeorm";

@Controller('likes')
export class LikesController {
    constructor(
        private readonly likesService: LikesService
    ) {}

    @Get( )
    listLikes(
        @Req() req, 
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Like[]> {
        const token = req.headers['x-auth-token'];
        return this.likesService.findLikesByToken(token, page, limit)
    }

    @Post()
    async addNewLike(@Body() newLikeData: CreateLikeDto, @Req() req): Promise<Like> {
        const token = req.headers['x-auth-token'];
        return this.likesService.addLike(newLikeData, token);
    }

    @Delete('/:cat_id')
    dropLike(@Param('cat_id') catId, @Req() req): Promise<DeleteResult> {
        const token = req.headers['x-auth-token'];
        return this.likesService.deleteLikeByCatId(catId, token);
    }
}