export interface INewsPaper {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    publishedDate: string;
    status: Status;
    categories: ICate[];
}
export interface ICate {
    id: string;
    name: string;
}
export enum Status {
    Posted = 0,
    Published = 1,
    Deleted = 2,
}
export interface INewsPaperAdd {
    title: string;
    content: string;
    description: string;
    categoryId: string[];
}
export interface INewsPaperUpdate {
    id: string;
    title: string;
    content: string;
    description: string;
    categoryId: string[];
}
export const DEFAULTS_NEW = {
    title: '',
    content: '',
    description: '',
    categoryId: []
}