import style from "./Loading.module.css"
export const LoadingPage = () => {
    return (
        <div className={style.LoadingPage}>
            <div className={style.waveLoader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export const Loading = () => {
    return (
        <div className={style.loading}>
            Завантаження<span>.</span><span>.</span><span>.</span>
        </div>
    );
};

