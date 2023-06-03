import { Button, FormControl, InputLabel, TextField, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';

interface IUser {
    avatar?: string | undefined;
    dateOfBirth: Dayjs | null;
    email?: string | undefined;
    name: string;
    password: string;
    phone?: string | undefined;
    username: string;
}

const defaultUserState = {
    avatar: '',
    dateOfBirth: null,
    email: '',
    name: '',
    password: '',
    phone: '',
    username: ''
}

function EditUser() {
    const [user, setUser] = useState<IUser>(defaultUserState);
    async function Save() {
        console.log(user)
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
                    <label htmlFor='input-dob'>Date Of Birth</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker value={null} onChange={(e) => setUser({ ...user, dateOfBirth: e })} />
                    </LocalizationProvider>
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