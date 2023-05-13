import { IColumn } from '@fluentui/react/lib/DetailsList';
export interface INewsPaper {
    id: string;
    title: string;
    content: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
}
export interface INewsPaperApiResponse {
    data: INewsPaper[];
    message?: string;
    success?: string;
}
export interface IDetailsListNewsPaperState {
    columns: IColumn[];
    items: INewsPaper[];
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    announcedMessage?: string;
}
export const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'Title',
        fieldName: 'title',
        minWidth: 70,
        isPadded: true,
    },
    {
        key: 'column2',
        name: 'Content',
        fieldName: 'content',
        minWidth: 70,
        isPadded: true,
    },
    {
        key: 'column3',
        name: 'Description',
        fieldName: 'description',
        minWidth: 70,
        isPadded: true,
    },
    {
        key: 'column4',
        name: 'CreatedDate',
        fieldName: 'createdDate',
        minWidth: 120,
        isPadded: true,
    },
];
export const DEFAULT_LIST_NEWSPAPER_STATE = {
    columns: [],
    items: [],
    selectionDetails: '',
    isModalSelection: false,
    isCompactMode: false,
    announcedMessage: ''
}