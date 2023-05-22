import * as request from '../utils/httpRequest';

export const getNewDetail = async (id: string) => {
    try {
        const res = await request.get('NewsDetail/GetNewDetail?newId=' + id);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};