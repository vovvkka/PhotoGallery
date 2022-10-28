import React, {useState} from 'react';
import {Avatar, Button, Grid, Menu, MenuItem} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {apiUrl} from "../../../../config";
import {userLogout} from "../../../../store/actions/usersActions";

const UserMenu = ({username, avatar}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (avatar && user.avatar.includes('uploads')) {
        avatar = apiUrl + '/' + avatar;
    }

    return (
        <Grid container alignItems='center'>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar alt={username} src={avatar ? avatar : ''} sx={{ width: 35, height: 35, marginX: '10px'}}/>
                Hello, {username}!
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => dispatch(userLogout())}>Logout</MenuItem>
            </Menu>
        </Grid>
    );
};

export default UserMenu;