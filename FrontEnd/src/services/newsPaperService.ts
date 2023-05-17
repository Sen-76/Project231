import * as request from '../utils/httpRequest';
import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const getnewsPaperList = async (page: Number) => {
    try {
        const res = await request.get('newspaper/getlistnewspaper', {
            params: { page }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const addnewsPaper = async (newspaper: any) => {
    try {
        const res = await request.post('NewsPaper/AddNewsPaper', newspaper);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};