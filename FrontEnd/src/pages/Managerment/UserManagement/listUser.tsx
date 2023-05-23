import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Title from '../../../components/Admin/DashboardManagement/title';
import * as newspaperService from '../../../services/newsPaperService';
import { useEffect, useState } from 'react';
import { INewsPaper } from '../../../components/NewsPaperListManager/model';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'img', headerName: 'IMG', width: 70, filterable: true },
    { field: 'title', headerName: 'Title', width: 230, filterable: true },
    { field: 'content', headerName: 'Content', width: 230, filterable: true },
    { field: 'createdDate', headerName: 'Created Date', width: 130, filterable: true },
    { field: 'modifiedDate', headerName: 'Modified Date', width: 130, filterable: true },
    { field: 'publishedDate', headerName: 'Published Date', width: 130, filterable: true },
    { field: 'description', headerName: 'Description', width: 230, filterable: true },
    {
        field: '',
        headerName: 'Action',
        width: 230,
        sortable: false,
        renderCell: (params) => (
            <div>
                <Button variant="outlined" startIcon={<EditIcon />}></Button>
                <Button variant="outlined" startIcon={<DeleteOutlineIcon />}></Button>
                <Button variant="outlined" startIcon={<VisibilityIcon />}></Button>
            </div>
        ),
    },
];

export default function ListUser() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    useEffect(() => {
        newspaperService
            .getnewsPaperList(1)
            .then((result: INewsPaper[]) => {
                if (result) {
                    setNewsPaperList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <React.Fragment>
            <Title>Newspaper Management</Title>
            <Button variant="outlined" startIcon={<AddIcon />}>
                Add
            </Button>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={newsPaperList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}
