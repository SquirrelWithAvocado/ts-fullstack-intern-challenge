import { store } from "./store";

export type CatInfo = {
    id: string;
    imageUrl: string;
    isFav: boolean;
};

export type UserInfo = {
    id: string,
    token: string
}

export type Data = {
    cats: CatInfo[],
    likedCats: CatInfo[],
    isCatsLoading: boolean,
    isLikesLoading: boolean,
    catsPage: number,
    likesPage: number,
    hasError: boolean
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;