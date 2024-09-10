import { createSlice } from "@reduxjs/toolkit";
import { CatInfo, Data } from "../types";
import { deleteLikeAction, fetchCatsAction, fetchLikedCatsAction, postLikeAction } from "./api-actions";
import { CATS_LOAD_LIMIT } from "../const";

const initialState: Data = {
    cats: [],
    likedCats: [],
    isCatsLoading: false,
    isLikesLoading: false,
    catsPage: 0,
    likesPage: 0,
    hasError: false
};

export const data = createSlice({
    name: 'DATA',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCatsAction.pending, (state) => {
                state.isCatsLoading = true;
                state.hasError = false;
            })
            .addCase(fetchCatsAction.fulfilled, (state, action) => {
                state.isCatsLoading = false;
                state.hasError = false;
                
                state.cats = [...state.cats, ...action.payload];
                state.catsPage++;
            })
            .addCase(fetchCatsAction.rejected, (state) => {
                state.isCatsLoading = false;
                state.hasError = true;
            })
            .addCase(fetchLikedCatsAction.pending, (state) => {
                state.isLikesLoading = true;
                state.hasError = false;
            })
            .addCase(fetchLikedCatsAction.fulfilled, (state, action) => {
                state.isLikesLoading = false;
                state.hasError = false;
                
                const newCats: CatInfo[] = action.payload.map((inf: any) => ({ id: inf.catId, imageUrl: inf.imageUrl, isFav: true }))

                const tracked = new Set();
                state.likedCats = [...state.likedCats, ...newCats].filter(cat => tracked.has(cat.id) ? false : tracked.add(cat.id));
                state.likesPage++;
            })
            .addCase(fetchLikedCatsAction.rejected, (state) => {
                state.isLikesLoading = false;
                state.hasError = true;
            })
            .addCase(deleteLikeAction.fulfilled, (state, action) => {
                state.isCatsLoading = false;
                state.hasError = false;
                
                const catToDelete = action.meta.arg;
                state.likedCats = state.likedCats.filter(cat => cat.id !== catToDelete.id);
                state.likesPage = Math.trunc(state.likedCats.length / CATS_LOAD_LIMIT);
            })
            .addCase(postLikeAction.fulfilled, (state) => {
                state.likesPage = Math.trunc(state.likedCats.length / CATS_LOAD_LIMIT);
            })
    }
});
