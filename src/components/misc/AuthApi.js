import axios from 'axios';

const BASE_URL = 'https://ypgblessedbits.azurewebsites.net/auth';
// const BASE_URL = 'http://localhost:8080/auth';

const instance = axios.create({
    baseURL: BASE_URL,
})

export const login = async (username, password) => {
    const response = await instance.post(`/login`, {username, password},
        { headers: { 'Content-type': 'application/json' } });
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    const {accessToken, tokenType} = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    return {accessToken, tokenType};
}

export const register = async (username, password, email = null) => {
    const response = await instance.post(`/register`, {username, password, email});
    if (response.status !== 201) {
        throw new Error(response.statusText);
    }
    return response.data;
}
