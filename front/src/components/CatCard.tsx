import { useState } from "react";
import { CatInfo } from "../types";
import { useAppDispatch } from "../hooks";
import { deleteLikeAction, postLikeAction } from "../store/api-actions";

type CatCardProps = {
    info: CatInfo
}

const CatCard = ({ info }: CatCardProps) => {
    const [isActive, changeActive] = useState(false);

    const dispatch = useAppDispatch();

    const mouseEnterHandler = () => changeActive(true);
    const mouseLeaveHandler = () => changeActive(false);

    const [liked, changeLike] = useState(info.isFav);
    const likeHandler = () => {
        if (!liked) {
            dispatch(postLikeAction(info));
            changeLike(true);
        } else {
            dispatch(deleteLikeAction(info));
            changeLike(false);
        }
    };

    return (
        <article
            className={"cat-card" + (isActive ? " cat-card--active" : "")}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <img src={info.imageUrl} alt="" className="cat-card__img" />
            {
                isActive &&
                <button 
                    className={"cat-card__like" + (liked ? " cat-card__like--active" : "")} 
                    aria-label="Нравится"
                    onClick={likeHandler}
                ></button>
            }
        </article>
    );
}

export default CatCard;