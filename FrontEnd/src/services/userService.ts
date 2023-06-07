import * as request from '../utils/httpRequest';
interface IUser {
    avatar?: string | undefined;
    dateOfBirth?: string | undefined;
    // dateOfBirth: Dayjs | null;
    email?: string | undefined;
    name: string;
    password: string;
    phone?: string | undefined;
    username: string;
}
interface IUserLogin {
    username: string;
    password: string;
}
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
export const userById = async (id: String) => {
    try {
        const res = await request.get('UserAdmin/UserById?id=' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const fetchUser = async (page: number) => {
    try {
        const res = await request.get('UserAdmin/FetchUser?pageIndex=' + page);
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
export const addUser = async (user: IUser) => {
    try {
        const res = await request.post('UserAdmin/AddUser', user);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = async (user: IUser) => {
    try {
        const res = await request.post('UserAdmin/UpdateUser', user);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
