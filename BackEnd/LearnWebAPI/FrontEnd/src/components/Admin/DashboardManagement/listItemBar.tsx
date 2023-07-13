import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

export default function MainListItems() {
    return (
        <React.Fragment>
            <Link to="/userManagement">
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Management" />
                </ListItemButton>
            </Link>
            <Link to="/newspapermanagement">
                <ListItemButton>
                    <ListItemIcon>
                        <InsertCommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="News Management" />
                </ListItemButton>
            </Link>

            <Link to="/commentManagement">
                <ListItemButton>
                    <ListItemIcon>
                        <InsertCommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comment Management" />
                </ListItemButton>
            </Link>
        </React.Fragment>
    );
}
