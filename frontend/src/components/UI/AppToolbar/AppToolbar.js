import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:hover': {
            color: 'inherit',
        },
        fontSize: '30px'
    },
    staticToolbar: {
        marginBottom: theme.spacing(6),
    },
    toolbar: {
        backgroundColor: `${theme.palette.grey["900"]} !important`,
        padding: '15px'
    }
}));

const AppToolbar = () => {
    const {classes} = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed" className={classes.toolbar}>
                <Container>
                    <Toolbar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    App
                                </Link>
                            </Typography>
                            <Grid item>
                                {user ? <UserMenu username={user.displayName} avatar={user.avatar}/> : <Anonymous/>}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;