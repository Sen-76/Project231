import * as request from '../utils/httpRequest';
export const getnewsPaperList = async () => {
    try {
        const res = await request.get('newspaper/getlistnewspaper');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};