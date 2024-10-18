import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/api/v1'
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.request.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401){
            alert('Session expired. Please login again.');
            localStorage.removeItem('token');
            window.location = '/'
        }

        return Promise.reject(error)
    }
)

export default axiosInstance;