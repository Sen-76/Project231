import * as React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

import Title from '../../../components/Admin/DashboardManagement/title';
import { Link } from 'react-router-dom';
import * as userService from '../../../services/userService';
import { useEffect, useState } from 'react';
import { ERole, EStatus, IUser } from '../../../interface/user';

export default function ListUser() {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [reload, setReloadt] = useState<boolean>(false);
    useEffect(() => {
        userService
            .fetchUser(1)
            .then((result) => {
                if (result) {
                    result.forEach((item: IUser) => {
                        setUserList((prevUserList) => [
                            ...prevUserList,
                            {
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
                            },
                        ]);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [reload]);
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 230, filterable: true },
        { field: 'username', headerName: 'Username', width: 230, filterable: true },
        { field: 'password', headerName: 'Password', width: 230, filterable: true },
        { field: 'email', headerName: 'Email', width: 130, filterable: true },
        { field: 'phone', headerName: 'Phone', width: 130, filterable: true },
        { field: 'avatar', headerName: 'Avatar', width: 130, filterable: true },
        { field: 'dateOfBirth', headerName: 'Date Of Birth', width: 230, filterable: true },
        { field: 'role', headerName: 'Role', width: 130, filterable: true },
        { field: 'status', headerName: 'Status', width: 130, filterable: true },
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
                    <Button variant="outlined" startIcon={<VisibilityIcon />}>
                        View
                    </Button>
                </div>
            ),
        },
    ];
    async function BanUser(id: string) {
        userService
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
        userService
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
    return (
        <React.Fragment>
            <Title>User Management</Title>
            <Link className="edit" to={`/addUser`}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Add
                </Button>
            </Link>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={userList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}
