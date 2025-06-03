let accessToken = null;

export async function login(username, password, remember) {
    console.log("Запуск login()");
    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error("Невірні дані");
            throw new Error("Помилка сервера");
        }

        const data = await response.json();
        accessToken = data.accessToken;

        if (remember) {
            localStorage.setItem("accessToken", accessToken);
        }

        return true;
    } catch (err) {
        throw err;
    }
}

export function getToken() {
    return accessToken || localStorage.getItem("accessToken");
}

export async function refreshToken() {
    try {
        const response = await fetch("http://localhost:8080/auth/refresh", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Помилка оновлення токена");

        const data = await response.json();
        accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (err) {
        throw err;
    }
}
