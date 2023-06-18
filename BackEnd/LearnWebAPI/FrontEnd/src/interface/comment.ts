import { IUser } from './user';
export interface IComment {
    id: string;
    newsPaperId: string;
    newsPaper: null;
    userId: string;
    user: IUser;
    content: string;
    postTime: string;
    isDeleted: false;
}
