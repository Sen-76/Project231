import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CategoryIcon from '@mui/icons-material/Category';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';
import * as CategoryService from '../../../services/categoryService';
import { ICategory } from '../../../components/ExamplaeForm/CategoryForm/model';

export default function MainListItems() {
    const [open, setOpen] = useState<boolean>(false);

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

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <NewspaperIcon />
                </ListItemIcon>
                <ListItemText primary="Newspapers" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AddCommentIcon />
                </ListItemIcon>
                <ListItemText primary="Comment" />
            </ListItemButton>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categorys" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {CategoryList.map((category, key) => (
                        <ListItemButton  key={key} sx={{ pl: 12 }}>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
}
