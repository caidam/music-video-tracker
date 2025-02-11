// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import { DJ_BASE_URL } from "../config";

// // const baseURL = 'http://127.0.0.1:8000'
// const baseURL = DJ_BASE_URL

// const useAxios = () => {
//     const { authTokens, setUser, setAuthTokens } = useContext(AuthContext)
        
//     const axiosInstance = axios.create({
//         baseURL,
//         headers:{Authorization: `Bearer ${authTokens?.access}`}
//     });

//     axiosInstance.interceptors.request.use(async req => {
    
//         const user = jwt_decode(authTokens.access)
//         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
//         if (!isExpired) return req
    
//         const response = await axios.post(`${baseURL}/api/token/refresh/`, {
//             refresh:authTokens.refresh
//         });
    
//         localStorage.setItem(`authTokens`, JSON.stringify(response.data))

//         setAuthTokens(response.data)
//         setUser(jwt_decode(response.data.access))

//         req.headers.Authorization = `Bearer ${response.data?.access}`
    
//         return req
//     });
    
//     return axiosInstance
// };


// export default useAxios;


import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { DJ_BASE_URL } from "../config";

const baseURL = DJ_BASE_URL;

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        console.log("Interceptor: Checking token validity...");
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            console.log("Interceptor: Token is valid.");
            return req;
        }

        console.log("Interceptor: Token expired, refreshing...");
        try {
            const response = await axios.post(`${baseURL}/api/token/refresh/`, {
                refresh: authTokens.refresh
            });

            console.log("Interceptor: Token refreshed.");
            localStorage.setItem(`authTokens`, JSON.stringify(response.data));
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));

            req.headers.Authorization = `Bearer ${response.data?.access}`;
            return req;
        } catch (error) {
            console.error("Interceptor: Token refresh failed.", error);
            // Handle token refresh failure, possibly redirect to login
            return Promise.reject(error);
        }
    });

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
                        refresh: authTokens.refresh
                    });

                    console.log("Interceptor: Token refreshed.");
                    localStorage.setItem(`authTokens`, JSON.stringify(response.data));
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));

                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error("Interceptor: Token refresh failed.", err);
                    // Handle token refresh failure, possibly redirect to login
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;
