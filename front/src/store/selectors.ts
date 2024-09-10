import { CatInfo, State } from "../types";

export const getCats = (state: State): CatInfo[] => state.cats;
export const getCatsPage = (state: State): number => state.catsPage;
export const getLikedCats = (state: State): CatInfo[] => state.likedCats;
export const getLikesPage = (state: State): number => state.likesPage;
export const isError = (state: State): boolean => state.hasError;