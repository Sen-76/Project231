import * as request from '../utils/httpRequest';

export const addCate = async (name: string) => {
    try {
        const res = await request.post('Category/AddCate?name=' + name);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteCate = async (id: string) => {
    try {
        const res = await request.post('Category/DeleteCate?cateId=' + id);
        return res.success;
    } catch (error) {
        console.log(error);
    }
};
export const listCate = async () => {
    try {
        const res = await request.get('Category/GetCate');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};