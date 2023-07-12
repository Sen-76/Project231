import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import * as commentService from '../../../services/commentService';
import { useEffect, useState } from 'react';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, GridColDef, GridSearchIcon } from '@mui/x-data-grid';
import Title from '../../../components/Admin/DashboardManagement/title';
import { IComment } from '../../../interface/comment';
import { Delete } from '@mui/icons-material';

export default function ListComment() {
    const [commentList, setCommentList] = useState<IComment[]>([]);
    const [isRefresh, setIsRefresh] = useState<boolean>(true);
    const [filter, setFilter] = useState('');
    async function Search() {
        setIsRefresh(!isRefresh);
    }
    useEffect(() => {
        commentService
            .getAllComment(filter)
            .then((result: IComment[]) => {
                if (result) {
                    setCommentList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isRefresh]);
    const Delete = async (id: string) => {
        await commentService
            .deleteCommentAdmin(id)
            .then((result) => {
                if (result) {
                    setIsRefresh(!isRefresh);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(id);
    };
    const RestoreDelete = async (id: string) => {
        await commentService
            .restoreDeleteCommentAdmin(id)
            .then((result) => {
                if (result) {
                    setIsRefresh(!isRefresh);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(id);
    };
    const columns: GridColDef[] = [
        {
            field: 'newsPaper',
            headerName: 'Newspaper',
            width: 230,
            renderCell: (params) => {
                return params.row.newsPaper.title;
            },
        },
        {
            field: 'owner',
            headerName: 'Owner',
            width: 200,
            renderCell: (params) => {
                return params.row.user.name;
            },
        },
        { field: 'content', headerName: 'Content', width: 200 },
        { field: 'postTime', headerName: 'Post Time', width: 200 },
        {
            field: 'isDeleted',
            headerName: 'Is Deleted',
            width: 130,
            renderCell: (params) => {
                return params.row.isDeleted ? 'Yes' : 'No';
            },
        },
        {
            field: '',
            headerName: 'Action',
            width: 230,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Button variant="outlined" onClick={() => Delete(params.row.id)} startIcon={<DeleteOutlineIcon />}>
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => RestoreDelete(params.row.id)}
                        startIcon={<DeleteOutlineIcon />}
                    >
                        Restore
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Title>Comment Management</Title>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Paper
                    component="form"
                    onSubmit={Search}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Comment"
                        inputProps={{ 'aria-label': 'search user' }}
                        onChange={(e) => {
                            console.log(e.target.value);
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
                    rows={commentList}
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
