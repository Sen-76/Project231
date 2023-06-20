import './header.scss';
import * as CategoryService from '../../../services/categoryService';
import { ICategory } from '../../../interface/category';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import routeConfig from '../../../config/routes';
import { useCookies } from 'react-cookie';

function Header() {
    const [CategoryList, SetCategoryList] = useState<ICategory[]>([]);
    const [cookies] = useCookies(['userLogin']);
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
                <Button size="small">Subscribe</Button>
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
                    <Link to={routeConfig.home}>{'M&E Magazine'}</Link>
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
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
