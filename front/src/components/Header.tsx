import { NavLink } from "react-router-dom";
import { AppRoute } from "../const";

const Header = () => {
    return (
        <header className="main__header">
            <nav className="main__nav nav">
                <ul className="nav__list center">
                    <li className="nav__item">
                        <NavLink to={AppRoute.Home} className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Все котики</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to={AppRoute.Favourites} className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Любимые котики</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;