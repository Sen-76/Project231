import * as request from '../utils/httpRequest';

export const getCommentofNew = async (page: number, id: string) => {
    try {
        const res = await request.get('Comment/GetListComment?pageIndex=' + page + '&newsPaperId=' + id);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addComment = async (content: string, newsid: string) => {
    try {
        const res = await request.post('Comment/AddComment?content=' + content + '&newspaperId=' + newsid);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteComment = async (id: string) => {
    try {
        const res = await request.post('Comment/DeleteComment?commentId=' + id);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};