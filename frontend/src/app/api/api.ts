import axios from "axios";



export const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            window.location.href = '/LoginPage';
        }
        if(error.response?.status === 500){
            alert("Ошибка. Попробуйте позднее")
        }
    }
)

