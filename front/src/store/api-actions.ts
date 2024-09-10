import { createAsyncThunk } from "@reduxjs/toolkit";
import { CatInfo, State, UserInfo } from "../types";
import { AxiosInstance } from "axios";
import { APIRoute, CATS_LOAD_LIMIT } from "../const";
import { dropToken, saveToken } from "../api/token";

export const fetchCatsAction = createAsyncThunk<
    CatInfo[],
    undefined,
    {
        state: State,
        extra: AxiosInstance,
    }
>(
    'data/fetchCats',
    async (_arg, { extra: api, getState }) => {
        const state = getState();
        
        const { data } = await api.get<CatInfo[]>(
            APIRoute.Cats, 
            { 
                params: {
                    page: state.catsPage,
                    limit: CATS_LOAD_LIMIT
                }
            }
        );

        return data;
    },
);

export const fetchLikedCatsAction = createAsyncThunk<
    CatInfo[],
    undefined,
    {
        state: State,
        extra: AxiosInstance
    }
>(
    'data/fetchLikedCats',
    async (_arg, { extra: api, getState }) => {
        const state = getState();
        
        const { data } = await api.get<CatInfo[]>(
            APIRoute.Likes, 
            { 
                params: {
                    page: state.likesPage,
                    limit: CATS_LOAD_LIMIT
                }
            }
        );
        
        return data;
    },
);

export const postLikeAction = createAsyncThunk<
    void,
    CatInfo,
    {
        state: State,
        extra: AxiosInstance
    }
>(
    'data/postLike',
    async ({ id: id }, { extra: api }) => {
        await api.post(APIRoute.Likes, { catId: id });
    },
);

export const deleteLikeAction = createAsyncThunk<
    void,
    CatInfo,
    {
        state: State,
        extra: AxiosInstance
    }
>(
    'data/deleteLike',
    async ({ id: id }, { extra: api }) => {
        await api.delete(APIRoute.Likes + `/${id}`);
    },
);

export const userRegisterAction = createAsyncThunk<
    void,
    undefined,
    {
        extra: AxiosInstance
    }
>(
    'user/register',
    async (_arg, { extra: api }) => {
        const userData = await api.post<UserInfo>(APIRoute.Register);
        saveToken(userData.data.token);
    }
)

export const userLogoutAction = createAsyncThunk<
    void,
    undefined,
    {
        extra: AxiosInstance
    }
>(
    'user/logout',
    async (_arg, { extra: api }) => {
        await api.delete<UserInfo>(APIRoute.Logout);
        dropToken();
    }
)