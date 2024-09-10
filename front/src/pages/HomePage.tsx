import { useCallback, useEffect } from "react";
import CatsList from "../components/CatsList";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCats } from "../store/selectors";
import { fetchCatsAction } from "../store/api-actions";

const HomePage = () => {
    const isCatsLoading = useAppSelector((state) => state.isCatsLoading);
    const hasError = useAppSelector((state) => state.hasError);

    const dispatch = useAppDispatch();

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 1
        ) {
            dispatch(fetchCatsAction());
        }
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch]);

    return (
        <>
            <CatsList catsInfo={useAppSelector(getCats)}/>           
            {isCatsLoading && <p className="main__banner">... загружаем еще котиков ...</p>}
            {hasError && <p className="main__banner">Упс. Случилась ошибка, попробуйте перезагрузить страницу</p>}
        </>
    );
}

export default HomePage;