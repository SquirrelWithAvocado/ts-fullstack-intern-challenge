import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    
    return (
        <section className="not-found__section">
            <div className="not-found__wrapper">
                <p className="not-found__text"><b>404</b> страница не найдена (</p>
                <button 
                    type="button" 
                    className="not-found__button"
                    onClick={() => navigate(-1)}
                >
                    Вернуться назад
                </button>
            </div>
        </section>
    );
};

export default NotFoundPage;