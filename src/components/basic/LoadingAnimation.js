import style from "./Loading.module.css"
export const LoadingPage = () => {
    return (
        <div className={style.LoadingPage}>
            Завантаження сторінки<span>.</span><span>.</span><span>.</span>
        </div>
    );
};

export const Loading = () => {
    return (
        <div className={style.LoadingPage}>
            Завантаження<span>.</span><span>.</span><span>.</span>
        </div>
    );
};

