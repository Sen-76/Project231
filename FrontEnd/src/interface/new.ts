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
