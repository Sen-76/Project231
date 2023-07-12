import { INewsPaper } from '../components/News/PopularNews/model';
import { IUser } from './user';
export interface IComment {
    id: string;
    newsPaperId: string;
    newsPaper: INewsPaper;
    userId: string;
    user: IUser;
    content: string;
    postTime: string;
    isDeleted: false;
}
