import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold">403 - Доступ заборонено</h1>
            <p className="mt-4 text-lg">У вас немає прав доступу до цієї сторінки.</p>
        </div>
    );
};

export default UnauthorizedPage;
