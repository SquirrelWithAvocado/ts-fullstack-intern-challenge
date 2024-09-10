import { Controller, Get, Query } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "src/types";

@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService
    ) { }

    @Get()
    listCats(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Cat[]> {
        return this.catsService.getCats(page, limit);
    }
}