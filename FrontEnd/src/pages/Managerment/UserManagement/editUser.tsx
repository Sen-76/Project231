import { Button, FormControl, InputLabel, TextField, Box, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import * as userService from '../../../services/userService'
import { useParams } from 'react-router-dom';

interface IUser {
    id: string
    avatar?: string | undefined;
    dateOfBirth?: string | undefined;
    // dateOfBirth: Dayjs | null;
    email?: string | undefined;
    name: string;
    password: string;
    phone?: string | undefined;
    username: string;
    role: ERole;
    status: Number;
}

enum ERole {
    User = 0,
    Writer = 1,
    Leader = 2,
    Editor = 3,
    Admin = 4,
}
enum EStatus {
    NotActive = 0,
    Active = 1,
    Banned = 2
}

const defaultUserState: IUser = {
    id: '4cea2479-63ef-4069-bef9-65649bae0905',
    avatar: '',
    dateOfBirth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
    username: '',
    role: ERole.User,
    status: 0
}

function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>(defaultUserState);
    useEffect(() => {
        userService.userById(id || '')
            .then((result: IUser) => {
                if (result) {
                    setUser(result)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    async function Save() {
        await userService.updateUser(user).then((result) => {
            console.log(result);
            if (result == true) {
                window.location.href = '/userManagement'
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <>
            <div className="titleCategoryM">Update user:</div>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-name'>Name</label>
                    <TextField value={user.name} id="input-name" onChange={(e) => setUser({ ...user, name: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-username'>Username</label>
                    <TextField value={user.username} id="input-username" onChange={(e) => setUser({ ...user, username: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-password'>Password</label>
                    <TextField value={user.password} id="input-password" onChange={(e) => setUser({ ...user, password: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-email'>Email</label>
                    <TextField value={user.email} id="input-email" onChange={(e) => setUser({ ...user, email: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-phone'>Phone</label>
                    <TextField value={user.phone} id="input-phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-avatar'>Avatar</label>
                    <TextField value={user.avatar} id="input-avatar" onChange={(e) => setUser({ ...user, avatar: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-avatar'>Date of Birth</label>
                    <TextField value={user.dateOfBirth} id="input-avatar" onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })} variant="outlined" />
                </FormControl>

                {/* <FormControl fullWidth variant="filled">
                    <label htmlFor='input-dob'>Date Of Birth</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker value={null} onChange={(e) => setUser({ ...user, dateOfBirth: e })} />
                    </LocalizationProvider>
                </FormControl> */}

                <FormControl fullWidth >
                    <label htmlFor='input-avatar'>Role</label>
                    <Select
                        labelId="age"
                        value={user.status}
                        label="Age"
                        onChange={(e) => setUser({ ...user, status: e.target.value as EStatus })}
                    >
                        <MenuItem value={EStatus.NotActive}>NotActive</MenuItem>
                        <MenuItem value={EStatus.Active}>Active</MenuItem>
                        <MenuItem value={EStatus.Banned}>Banned</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <label htmlFor='input-avatar'>Status</label>
                    <Select
                        labelId="age"
                        value={user.role}
                        label="Age"
                        onChange={(e) => setUser({ ...user, role: e.target.value as ERole })}
                    >
                        <MenuItem value={ERole.User}>User</MenuItem>
                        <MenuItem value={ERole.Writer}>Writer</MenuItem>
                        <MenuItem value={ERole.Editor}>Editor</MenuItem>
                        <MenuItem value={ERole.Leader}>Leader</MenuItem>
                        <MenuItem value={ERole.Admin}>Admin</MenuItem>
                    </Select>
                </FormControl>

                <div className='actionButton'>
                    <Button onClick={Save}>Save</Button>
                    <Button>Close</Button>
                </div>
            </Box>
        </>
    );
}

export default EditUser;