import * as request from '../utils/httpRequest';

export const getnewsPaperList = async (page: number) => {
    try {
        const res = await request.get('newspaper/getlistnewspaper', {
            params: { page },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getnewsPaperById = async (id: string) => {
    try {
        const res = await request.get('newspaper/GetNewsPaperById', {
            params: { id },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const fetchnewsPaperList = async (page: number, filter: string) => {
    try {
        const res = await request.get('NewsPaper/FetchNewsPaper?pageIndex=' + page + '&search=' + filter);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const addnewsPaper = async (newspaper: any) => {
    try {
        const res = await request.post('NewsPaper/AddNewsPaper', newspaper);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const updatenewsPaper = async (newspaper: any) => {
    try {
        const res = await request.post('NewsPaper/UpdateNewsPaper', newspaper);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deletenewsPaper = async (id: string) => {
    try {
        const res = await request.post('NewsPaper/DeleteNewsPaper?id=' + id);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const publishnewsPaper = async (id: string) => {
    try {
        const res = await request.post('NewsPaper/PublishNewsPaper?id=' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const listnewsPaperByCate = async (id: string) => {
    try {
        const res = await request.get('NewsPaper/GetNewsPaperByCate?id=' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const restorenewsPaper = async (id: string) => {
    try {
        const res = await request.post('NewsPaper/RestoreNewsPaper?id=' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
