export interface INewsPaper {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
}
export interface INewsPaperAdd {
    title: string;
    content: string;
    description: string;
}
export const DEFAULTS_NEW = {
    title: '',
    content: '',
    description: '',
}