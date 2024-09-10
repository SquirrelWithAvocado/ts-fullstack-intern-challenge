import { CatInfo } from "../types";
import CatCard from "./CatCard";

type CatListProps = {
    catsInfo: CatInfo[]
}

const CatsList = ({ catsInfo }: CatListProps) => {
    return (
        <section className="cats-list center">
            {
                <ul className="cats-list__list">
                    {
                        catsInfo.map((inf) =>
                            <li className="cats-list__item" key={inf.id}><CatCard info={inf} /></li>
                        )
                    }
                </ul>
            }
        </section>
    );
}

export default CatsList;