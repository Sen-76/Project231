import * as React from 'react';
import { Avatar, Button, IconButton, InputBase, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, GridColDef, GridSearchIcon } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

import Title from '../../../components/Admin/DashboardManagement/title';
import { Link } from 'react-router-dom';
import * as userService from '../../../services/userService';
import { useEffect, useState } from 'react';
import { ERole, EStatus, IUser } from '../../../interface/user';
import routeConfig from '../../../config/routes';

export default function ListUser() {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [reload, setReloadt] = useState<boolean>(false);
    const [filter, setFilter] = useState('');
    
    async function FetchUser() {
        try {
            const result = await userService.fetchUser(1, filter);
            if (result) {
                setUserList(
                    result.map((item: IUser) => ({
                        name: item.name,
                        avatar: item.avatar,
                        dateOfBirth: item.dateOfBirth,
                        id: item.id,
                        password: item.password,
                        phone: item.phone,
                        role: ERole[item.role as unknown as keyof typeof ERole],
                        status: EStatus[item.status as unknown as keyof typeof EStatus],
                        username: item.username,
                        email: item.email,
                    })),
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        FetchUser();
    }, [reload]);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 230,
            filterable: true,
            renderCell: (params) => {
                try {
                    const avatarImage = require(`../../../ImageSave/${params.row.avatar}`);
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <Avatar alt={params.row.name} src={avatarImage} />
                            <span>{params.row.name}</span>
                        </div>
                    );
                } catch (error) {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <Avatar>{params.row.name.charAt(0)}</Avatar>
                            <span>{params.row.name}</span>
                        </div>
                    );
                }
            },
        },
        { field: 'username', headerName: 'Username', width: 230 },
        { field: 'password', headerName: 'Password', width: 230 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'dateOfBirth', headerName: 'Date Of Birth', width: 230 },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: '',
            headerName: 'Action',
            width: 400,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Link className="edit" to={`/editUser/${params.row.id}`}>
                        <Button variant="outlined" startIcon={<EditIcon />}>
                            Edit
                        </Button>
                    </Link>
                    <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={() => BanUser(params.row.id)}>
                        Ban
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => UnBanUser(params.row.id)}
                    >
                        UnBan
                    </Button>
                </div>
            ),
        },
    ];
    async function BanUser(id: string) {
        await userService
            .banUser(id)
            .then((result) => {
                if (result === true) {
                    setUserList([]);
                    setReloadt(!reload);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async function UnBanUser(id: string) {
        await userService
            .unbanUser(id)
            .then((result) => {
                if (result === true) {
                    setUserList([]);
                    setReloadt(!reload);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async function Search() {
        setReloadt(!reload);
    }
    return (
        <React.Fragment>
            <Title>User Management</Title>
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}
            >
                <Link className="edit" to={routeConfig.addUser}>
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
                        placeholder="Search User"
                        inputProps={{ 'aria-label': 'search user' }}
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
                    rows={userList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    // hideFooter={true}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}
