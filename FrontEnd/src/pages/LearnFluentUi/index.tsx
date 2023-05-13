import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';

export interface IDocument {
    key: string;
    name: string;
    value: string;
    iconName: string;
    fileType: string;
    modifiedBy: string;
    dateModified: string;
    fileSize: string;
    fileSizeRaw: number;
}
export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: IDocument[];
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    announcedMessage?: string;
}
var detailsList: IDetailsListDocumentsExampleState = {
    columns: [],
    items: [
        {
            key: '1',
            name: 'name',
            value: 'value',
            iconName: 'pdf',
            fileType: 'pdf',
            modifiedBy: 'Sen',
            dateModified: '22-12-2015',
            fileSize: 'string',
            fileSizeRaw: 0,
        }
    ],
    selectionDetails: '',
    isModalSelection: false,
    isCompactMode: false,
    announcedMessage: ''
}
const columns: IColumn[] = [
    {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        data: 'string',
        isPadded: true,
    },
    {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModified',
        minWidth: 70,
        isPadded: true,
    },
    {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        isPadded: true,
    },
    {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
    },
];
function LearnFluentUI() {
    return (
        <div>
            <DetailsList
                items={detailsList.items}
                columns={columns}
                selectionMode={SelectionMode.multiple}
            />
        </div>
    );
}

export default LearnFluentUI;   