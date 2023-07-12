import * as request from '../utils/httpRequest';

export const getCommentofNew = async (page: number, id: string) => {
    try {
        const res = await request.get('Comment/GetListComment?pageIndex=' + page + '&newsPaperId=' + id);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAllComment = async (filter: string) => {
    try {
        const res = await request.get('https://localhost:7123/api/Comment/GetAllComments?filter=' + filter);
        return res.data;
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
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteCommentAdmin = async (id: string) => {
    try {
        const res = await request.post('Comment/DeleteCommentAdmin?commentId=' + id);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const restoreDeleteCommentAdmin = async (id: string) => {
    try {
        const res = await request.post('Comment/RestoreDeleteCommentAdmin?commentId=' + id);
        return res;
    } catch (error) {
        console.log(error);
    }
};
