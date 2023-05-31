import * as request from '../utils/httpRequest';
export interface INewsPaperAdd {
    title: string;
    content: string;
    description: string;
    categoryId: string[];
}
export interface INewsPaperUpdate {
    id: string;
    title: string;
    content: string;
    description: string;
    categoryId: string[];
}
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
export const addnewsPaper = async (newspaper: INewsPaperAdd) => {
    try {
        const res = await request.post('NewsPaper/AddNewsPaper', newspaper);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updatenewsPaper = async (newspaper: INewsPaperUpdate) => {
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
        return res.data;
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