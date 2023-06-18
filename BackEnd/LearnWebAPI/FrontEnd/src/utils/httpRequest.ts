import axios from 'axios';
import { useCookies } from 'react-cookie';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const CustomInterceptor = () => {
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    console.log('token: ' + token);

    httpRequest.interceptors.request.use(
        config => {
            if (token) {
                config.headers!['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return null;
};

export const get = async (path: any, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path: any, option = {}) => {
    const response = await httpRequest.post(path, option);
    return response.data;
};

export default httpRequest;

export { CustomInterceptor };
