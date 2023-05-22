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