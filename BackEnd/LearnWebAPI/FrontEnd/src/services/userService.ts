import * as request from '../utils/httpRequest';
import { IUser, IUserLogin } from '../interface/user';

export const login = async (user: IUserLogin) => {
    try {
        const res = await request.post('User/Login', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const regis = async (user: IUser) => {
    try {
        const res = await request.post('User/Regis', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const forgot = async (email: string) => {
    try {
        const res = await request.post('User/ForgotPass?Email=' + email);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const resetPassword = async (resetPass: any) => {
    try {
        const res = await request.post('User/ResetPass', resetPass);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const userById = async (id: String) => {
    try {
        const res = await request.get('UserAdmin/UserById?id=' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const fetchUser = async (page: number, search: string) => {
    try {
        const res = await request.get('UserAdmin/FetchUser?pageIndex=' + page + '&search=' + search);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const banUser = async (id: string) => {
    try {
        const res = await request.post('UserAdmin/BanUser?id=' + id);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const unbanUser = async (id: string) => {
    try {
        const res = await request.post('UserAdmin/UnBanUser?id=' + id);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const addUser = async (user: any) => {
    try {
        const res = await request.post('UserAdmin/AddUser', user);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = async (user: any) => {
    try {
        const res = await request.post('UserAdmin/UpdateUser', user);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
