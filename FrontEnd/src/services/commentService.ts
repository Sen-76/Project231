import * as request from '../utils/httpRequest';

export const getCommentofNew = async (page: number, id: string) => {
    try {
        const res = await request.get('Comment/GetListComment?pageIndex=' + page + '&newsPaperId=' + id);
        console.log("res: ", res);
        return res;
    } catch (error) {
        console.log(error);
    }
};