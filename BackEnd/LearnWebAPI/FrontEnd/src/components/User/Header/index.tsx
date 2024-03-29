import './header.scss';
import * as CategoryService from '../../../services/categoryService';
import { ICategory } from '../../../interface/category';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import routeConfig from '../../../config/routes';
import { useCookies } from 'react-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from '../../Admin/DashboardManagement/profileIcon';

function Header() {
    const [CategoryList, SetCategoryList] = useState<ICategory[]>([]);
    const [cookies] = useCookies(['userLogin']);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    useEffect(() => {
        CategoryService.listCate()
            .then((category) => {
                if (category) {
                    SetCategoryList(category);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <img style={{width: "100px", height: "100px"}} src='https://us.123rf.com/450wm/logotok/logotok2004/logotok200406237/145886924-letter-me-logo-icon-design-template-elements.jpg?ver=6' />
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 8 }}>
                    <Link to={routeConfig.home}>{'M&E Magazine'}</Link>
                </Typography>

                {cookies.userLogin === undefined ? (
                    <Link to={`/signin`}>
                        <Button variant="outlined" size="small">
                            Sign In
                        </Button>
                    </Link>
                ) : cookies.userLogin.Avatar !== '' ? (
                    <Avatar
                        alt={cookies.userLogin.Username}
                        src={require(`../../../ImageSave/` + cookies.userLogin.Avatar)}
                    ></Avatar>
                ) : (
                    <Avatar alt={cookies.userLogin.Username}>{cookies.userLogin.Username.charAt(0)}</Avatar>
                )}

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {cookies.userLogin === undefined ? (
                    <Link to={`/signin`}>
                        <Button variant="outlined" size="small">
                            Sign In
                        </Button>
                    </Link>
                ) : (
                    <AccountMenu></AccountMenu>
                )}
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}></Typography>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
                {CategoryList.map((category) => (
                    <Link key={category.id} to={`/listNews/${category.id}`}>
                        {category.name}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;
