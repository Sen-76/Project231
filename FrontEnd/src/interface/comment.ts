import { IUser } from './user';
export interface IComment {
    commentId: string;
    newsPaperId: string;
    newsPaper: null;
    userId: string;
    user: IUser;
    content: string;
    postTime: Date;
    isDeleted: false;
}
