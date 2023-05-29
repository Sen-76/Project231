import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';
import * as CategoryService from '../../../services/categoryService';
import { Link } from 'react-router-dom';
import { ICategory } from '../../ExamplaeForm/CategoryForm/model';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

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
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Author Management" />
            </ListItemButton>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <NewspaperIcon />
                </ListItemIcon>
                <ListItemText primary="Category Post" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Link to="/newspaperManagement">
                    <List component="div" disablePadding>
                        {CategoryList.map((category, key) => (
                            <ListItemButton key={key} sx={{ pl: 12 }}>
                                <ListItemText primary={category.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </Link>
            </Collapse>
            <ListItemButton>
                <ListItemIcon>
                    <InsertCommentIcon />
                </ListItemIcon>
                <ListItemText primary="Comment" />
            </ListItemButton>
        </React.Fragment>
    );
}
