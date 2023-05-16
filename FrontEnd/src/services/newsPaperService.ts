import * as request from '../utils/httpRequest';
export interface INesPapersAddVM {
    title: string,
    content: string,
    description: string
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
export const addnewsPaper = async (newspaper: INesPapersAddVM) => {
    try {
        const res = await request.get('newspaper/getlistnewspaper', {
            params: { newspaper }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};