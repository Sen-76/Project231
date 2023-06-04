import { Button, FormControl, InputLabel, TextField, Box, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import * as userService from '../../../services/userService'

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

const defaultUserState = {
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

function AddUser() {
    const [user, setUser] = useState<IUser>(defaultUserState);
    async function Save() {
        await userService.addUser(user).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <>
            <div className="titleCategoryM">Add new user:</div>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-name'>Name</label>
                    <TextField id="input-name" onChange={(e) => setUser({ ...user, name: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-username'>Username</label>
                    <TextField id="input-username" onChange={(e) => setUser({ ...user, username: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-password'>Password</label>
                    <TextField id="input-password" onChange={(e) => setUser({ ...user, password: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-email'>Email</label>
                    <TextField id="input-email" onChange={(e) => setUser({ ...user, email: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-phone'>Phone</label>
                    <TextField id="input-phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-avatar'>Avatar</label>
                    <TextField id="input-avatar" onChange={(e) => setUser({ ...user, avatar: e.target.value })} variant="outlined" />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <label htmlFor='input-avatar'>Date of Birth</label>
                    <TextField id="input-avatar" onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })} variant="outlined" />
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

export default AddUser;