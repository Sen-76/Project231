import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import * as newspaperService from '../../../services/newsPaperService';
import './index.scss';
import { useEffect, useState } from 'react';
import { INewsPaper } from '../../../interface/new';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, GridColDef, GridSearchIcon } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import routeConfig from '../../../config/routes';
import Title from '../../../components/Admin/DashboardManagement/title';

export default function ListNewspaper() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    const [isRefresh, setIsRefresh] = useState<boolean>(true);
    const [filter, setFilter] = useState('');
    async function Search() {
        setIsRefresh(!isRefresh);
    }
    useEffect(() => {
        newspaperService
            .fetchnewsPaperList(1, filter)
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
        { field: 'title', headerName: 'Title', width: 230 },
        { field: 'description', headerName: 'Description', width: 230 },
        { field: 'createdDate', headerName: 'Created Date', width: 130 },
        { field: 'modifiedDate', headerName: 'Modified Date', width: 130 },
        { field: 'publishedDate', headerName: 'Published Date', width: 130 },
        {
            field: '',
            headerName: 'Action',
            width: 230,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Link className="edit" to={`/editNewspaper/${params.row.id}`}>
                        <Button variant="outlined" startIcon={<EditIcon />}>
                            Edit
                        </Button>{' '}
                    </Link>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => DeleteNews(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Title>Newspaper Management</Title>
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}
            >
                <Link className="edit" to={routeConfig.addNewspaper}>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                        Add
                    </Button>
                </Link>
                <Paper
                    component="form"
                    onSubmit={Search}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => {
                            setFilter(e.target.value.trim());
                        }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={Search}>
                        <GridSearchIcon />
                    </IconButton>
                </Paper>
            </div>

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
