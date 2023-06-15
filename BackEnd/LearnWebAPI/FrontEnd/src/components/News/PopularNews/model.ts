export interface INewsPaper {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    rate: number;
    voteCount: number;
    like: number;
    dislike: number;
    author: IAuthor;
    image: string;
}

export interface IAuthor {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
    dateOfBirth: string;
    role: 0;
}
