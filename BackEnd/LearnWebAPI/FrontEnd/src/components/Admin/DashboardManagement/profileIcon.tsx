import * as React from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { Logout } from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import routeConfig from '../../../config/routes';
import image from '../../../ImageSave/021f1d43-6141-4042-b556-0be7b81443f8@$^()_+fgusagfusaigfiuasgfusagufafsaf-sihfiahfisafha.jpg';
export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['userLogin', 'token']);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    function handleProfile() {
        navigate(routeConfig.userProfile);
    };
    function handleLogout() {
        navigate(routeConfig.signin);
        removeCookie('userLogin');
        removeCookie('token');
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {cookies.userLogin &&
                            (cookies.userLogin.Avatar !== '' ? (
                                <Avatar
                                    src={require(`../../../ImageSave/${cookies.userLogin.Avatar}`)}
                                    alt={cookies.userLogin.Username}
                                ></Avatar>
                            ) : (
                                <Avatar sx={{ width: 32, height: 32 }} alt={cookies.userLogin.Username}>
                                    {cookies.userLogin.Username.charAt(0)}
                                </Avatar>
                            ))}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleProfile}
                onClick={handleProfile}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfile}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
