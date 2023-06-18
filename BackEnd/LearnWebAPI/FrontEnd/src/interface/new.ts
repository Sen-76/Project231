export interface INewsPaperAdd {
    id: string;
    image: File | null;
    title: string;
    content: string;
    description: string;
    categoryId: string[];
}
export const defaultNewsPaperAdd: INewsPaperAdd = {
    id: '4cea2479-63ef-4069-bef9-65649bae0905',
    image: null,
    title: '',
    content: '',
    description: '',
    categoryId: [],
};
// export interface INewsPaperUpdate {
//     id: string;
//     title: string;
//     content: string;
//     description: string;
//     categoryId: string[];
// }
export interface INewsPaper {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    image: string;
}
export interface IAuthor {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
    dateOfBirth: string;
    role: 0;
}
export interface INewsPaperDetail {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    publishedDate: string;
    modifiedDate: string;
    rate: number;
    voteCount: number;
    like: number;
    dislike: number;
    author: IAuthor;
}
export interface INewsPaperApiResponse {
    data: INewsPaper[];
    message?: string;
    success?: string;
}
