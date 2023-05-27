import * as request from '../utils/httpRequest';
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