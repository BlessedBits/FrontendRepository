import style from "./Loading.module.css"
export const LoadingPage = () => {
    return (
        <div class={style.LoadingPage}>
            <div class={style.waveLoader}>
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

