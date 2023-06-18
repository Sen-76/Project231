import { Button, FormControl, TextField, Box, Select, MenuItem } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import * as userService from '../../../services/userService';
import { useParams } from 'react-router-dom';
import { IUser, ERole, EStatus, defaultUserState } from '../../../interface/user';
import React from 'react';

function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>(defaultUserState);
    useEffect(() => {
        userService
            .userById(id ?? '')
            .then((result: IUser) => {
                if (result) {
                    setUser(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target.files as FileList)[0];
        setUser({ ...user, avatar: file || null });
    };
    async function Save() {
        const users = new FormData();
        users.append('id', user.id);
        users.append('name', user.name.trim());
        users.append('username', user.username);
        users.append('password', user.password);
        users.append('email', user.email?.trim() || '');
        users.append('phone', user.phone?.trim() || '');
        if (user.avatar) {
            users.append('avatar', user.avatar);
        } else {
            users.append('avatar', '');
        }
        users.append('dateOfBirth', user.dateOfBirth || '2023-06-15');
        users.append('role', user.role.toString());
        users.append('status', user.status.toString());
        await userService
            .updateUser(users)
            .then((result) => {
                console.log(result);
                if (result) {
                    window.location.href = '/usermanagement';
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <>
            <div className="titleCategoryM">Update user:</div>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <label htmlFor="input-name">Name</label>
                    <TextField
                        value={user.name}
                        id="input-name"
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-username">Username</label>
                    <TextField
                        value={user.username}
                        id="input-username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-password">Password</label>
                    <TextField
                        value={user.password}
                        id="input-password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-email">Email</label>
                    <TextField
                        value={user.email || ''}
                        id="input-email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-phone">Phone</label>
                    <TextField
                        value={user.phone || ''}
                        id="input-phone"
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-avatar">Avatar</label>
                    <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleFileChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            accept: '.jpg,.png,.jpeg,.webp',
                        }}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-avatar">Date of Birth</label>
                    <TextField
                        value={user.dateOfBirth || ''}
                        id="input-avatar"
                        onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-avatar">Role</label>
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

                <FormControl fullWidth>
                    <label htmlFor="input-avatar">Status</label>
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

                <div className="actionButton">
                    <Button onClick={Save}>Save</Button>
                    <Button>Close</Button>
                </div>
            </Box>
        </>
    );
}

export default EditUser;
