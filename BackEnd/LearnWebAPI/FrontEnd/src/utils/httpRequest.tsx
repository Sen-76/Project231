import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path: any, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path: any, option = {}) => {
    const response = await httpRequest.post(path, option);
    return response.data;
};

export const getLoged = async (path: any, options: any = {}, token: any) => {
    const config = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await httpRequest.get(path, config);
    return response.data;
};

export const postLoged = async (path: any, data: any, options: any = {}, token: any) => {
    const config = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await httpRequest.post(path, data, config);
    return response.data;
};

export default httpRequest;
