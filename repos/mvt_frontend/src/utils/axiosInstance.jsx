// import axios from 'axios'
// import jwt_decode from 'jwt-decode'
// import dayjs from 'dayjs'
// import { DJ_BASE_URL } from '../config'

// // const baseURL = 'http://127.0.0.1:8000'
// const baseURL = DJ_BASE_URL

// let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

// const axiosInstance = axios.create({
//     baseURL,
//     headers:{Authorization: `Bearer ${authTokens?.access}`}
// });

// axiosInstance.interceptors.request.use(async req => {
//     if (!authTokens) {
//         authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//         req.headers.Authorization = `Bearer ${authTokens?.access}`
//     }

//     const user = jwt_decode(authTokens.access)
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req

//     const response = await axios.post(`${baseURL}/api/token/refresh/`, {
//         refresh:authTokens.refresh
//     });

//     localStorage.setItem(`authTokens`, JSON.stringify(response.data))
//     req.headers.Authorization = `Bearer ${response.data?.access}`

//     return req
// });

// export default axiosInstance;

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { DJ_BASE_URL } from '../config';

const baseURL = DJ_BASE_URL;

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
let isRefreshing = false;
let refreshSubscribers = [];

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
});

// Function to add subscribers for token refresh
const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

// Function to notify subscribers with the new token
const onRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
};

// Function to handle token refresh
const refreshToken = async () => {
    isRefreshing = true;
    try {
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
        });
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        authTokens = response.data;
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
        onRefreshed(response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;
    } finally {
        isRefreshing = false;
        refreshSubscribers = [];
    }
};

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        req.headers.Authorization = `Bearer ${authTokens?.access}`;
    }

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    if (!isRefreshing) {
        // Refresh the token
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
            req.headers.Authorization = `Bearer ${newAccessToken}`;
        }
    } else {
        // Wait for token to be refreshed and update request with new token
        return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
                req.headers.Authorization = `Bearer ${newToken}`;
                resolve(req);
            });
        });
    }
    return req;
});

export default axiosInstance;
