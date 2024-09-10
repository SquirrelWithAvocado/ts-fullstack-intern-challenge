import { BadRequestException, Injectable } from "@nestjs/common";
import { Cat } from "src/types";

@Injectable()
export class CatsService {
    private readonly apiUrl = 'https://api.thecatapi.com/v1/images/';
    private readonly apiKey = 'live_3mx24ZA4cinbustYDbdlwoS8zBzvFqEs8128FKA62ewQPuYoZKrRdCev8R6xjc6k';

    async getCats(page: number, limit: number): Promise<Cat[]> {
        const skip = Math.max(page - 1, 0) * limit;

        if (page < 0 || limit < 1) {
            throw new BadRequestException(`Invalid page or limit`)
        }

        const res = await fetch(
            this.apiUrl + 'search?' + new URLSearchParams({
                page: skip.toString(),
                limit: limit.toString()
            }).toString(),
            {
                headers: {
                    'x-api-key': this.apiKey
                },
            }
        )

        if (!res.ok) {
            const errorBody = await res.text();
            console.error('Error response body:', errorBody);
            throw new BadRequestException(
                `Failed to fetch cats. Status code: ${res.status}`
            );
        }

        const data = await res.json();
        const cats: Cat[] = data.map((cat: any) => ({
            id: cat.id,
            imageUrl: cat.url,
        }));

        return cats;
    }
}