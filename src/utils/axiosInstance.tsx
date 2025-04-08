import axios from 'axios';
import { BASE_URL, REFRESH_TOKEN_URL } from '../constant';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const tokenData = localStorage.getItem('token');
        const token = tokenData ? JSON.parse(tokenData)?.access : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If 401 error (Unauthorized), attempt to refresh the token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokenData = localStorage.getItem('token');
                const refreshToken = tokenData ? JSON.parse(tokenData)?.refresh : null;

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Send the refresh token to get a new access token
                const response = await axios.post(REFRESH_TOKEN_URL, {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;
                const newRefreshToken = response.data.refresh;

                // Update tokens in localStorage
                localStorage.setItem('token', JSON.stringify({ access: newAccessToken, refresh: newRefreshToken }));

                // Update the request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);

            } catch (error) {
                console.error('Error refreshing token:', error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
