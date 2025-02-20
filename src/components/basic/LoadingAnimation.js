import style from "./Loading.module.css";
export const LoadingPage = () => {
    return (
        <>
            <div className={style.loader}></div>
        </>
    );
};

export const Loading = () => {
    return (
        <div className={style.loading}>
            <span>З</span>
            <span>а</span>
            <span>в</span>
            <span>а</span>
            <span>н</span>
            <span>т</span>
            <span>а</span>
            <span>ж</span>
            <span>е</span>
            <span>н</span>
            <span>н</span>
            <span>я</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    );
};
