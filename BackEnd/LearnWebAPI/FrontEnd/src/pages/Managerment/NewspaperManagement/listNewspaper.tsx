import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import * as newspaperService from '../../../services/newsPaperService';
import './index.scss';
import { useEffect, useState } from 'react';
import { INewsPaper } from '../../../interface/new';
import { Button, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';

export default function ListNewspaper() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    const [isRefresh, setIsRefresh] = useState<boolean>(true);
    useEffect(() => {
        newspaperService
            .fetchnewsPaperList(1)
            .then((result: INewsPaper[]) => {
                if (result) {
                    setNewsPaperList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isRefresh]);
    async function DeleteNews(id: string) {
        newspaperService
            .deletenewsPaper(id)
            .then((result: INewsPaper[]) => {
                console.log(result);
                if (result) {
                    setIsRefresh(!isRefresh);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const columns: GridColDef[] = [
        {
            field: 'image',
            headerName: 'IMG',
            width: 70,
            filterable: true,
            renderCell: (params) => {
                try {
                    const avatarImage = require(`../../../ImageSave/${params.row.image}`);
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <img
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                alt={params.row.title}
                                src={avatarImage}
                            />
                        </div>
                    );
                } catch (error) {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}></div>
                    );
                }
            },
        },
        { field: 'title', headerName: 'Title', width: 230, filterable: true },
        { field: 'description', headerName: 'Description', width: 230, filterable: true },
        { field: 'createdDate', headerName: 'Created Date', width: 130, filterable: true },
        { field: 'modifiedDate', headerName: 'Modified Date', width: 130, filterable: true },
        { field: 'publishedDate', headerName: 'Published Date', width: 130, filterable: true },
        {
            field: '',
            headerName: 'Action',
            width: 230,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Link className="edit" to={`/editNewspaper/${params.row.id}`}>
                        <Button variant="outlined" startIcon={<EditIcon />}></Button>{' '}
                    </Link>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => DeleteNews(params.row.id)}
                    ></Button>
                    <Button variant="outlined" startIcon={<VisibilityIcon />}></Button>
                </div>
            ),
        },
    ];
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
                <div className="formSearchM">
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

            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={newsPaperList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 1, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}
