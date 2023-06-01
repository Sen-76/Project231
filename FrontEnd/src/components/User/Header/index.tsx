import './header.scss';
import * as CategoryService from '../../../services/categoryService';
import { ICategory } from '../../ExamplaeForm/CategoryForm/model';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
function Header() {
    const [CategoryList, SetCategoryList] = useState<ICategory[]>([]);
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
                    {'Misa&Elwyn Magazine'}
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Link to={`/signup`}>
                    <Button variant="outlined" size="small">
                        Sign Up
                    </Button>
                </Link>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
                {CategoryList.map((category, key) => (
                    <Link key={key} to={`/listNews/${category.id}`}>
                        {category.name}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;
