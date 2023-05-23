import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import * as newspaperService from '../../../services/newsPaperService';
import './index.scss';
import { useEffect, useState } from 'react';
import { INewsPaper } from '../../../components/NewsPaperListManager/model';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

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

export default function ListNewspaper() {
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
            <div className="titleCategoryM">Category:</div>

            <div className="formHeadM">
                <div>
                    <Button variant="outlined">
                        <DeleteOutlinedIcon></DeleteOutlinedIcon>
                        Delete
                    </Button>
                </div>
                <div className='formSearchM'>
                    <input className="inputSearchM" placeholder="Search" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchOutlinedIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </div>
            </div>
            <Button variant="outlined" startIcon={<AddIcon />}>
                Write
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
