import { useCallback, useEffect } from "react";
import CatsList from "../components/CatsList";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchLikedCatsAction } from "../store/api-actions";
import { getLikedCats } from "../store/selectors";

const FavouritesPage = () => {
    const isLikesLoading = useAppSelector((state) => state.isLikesLoading);
    const hasError = useAppSelector((state) => state.hasError);

    const dispatch = useAppDispatch();

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 1
        ) {
            dispatch(fetchLikedCatsAction());
        }
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchLikedCatsAction());
    }, []);

    return (
        <>
            <CatsList catsInfo={useAppSelector(getLikedCats)}/>           
            {isLikesLoading && <p className="main__banner">... загружаем еще котиков ...</p>}
            {hasError && <p className="main__banner">Упс. Случилась ошибка, попробуйте перезагрузить страницу</p>}
        </>
    );
}

export default FavouritesPage;