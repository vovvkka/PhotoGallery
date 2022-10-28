import React, {useEffect, useState} from 'react';
import {Avatar, Container, Grid, Link, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import ButtonWithProgress from "../components/UI/ButtonWithProgress";
import {Link as RouterLink} from 'react-router-dom';
import FileInput from "../components/UI/Form/FileInput";
import FacebookLogin from "../components/UI/FacebookLogin";
import {clearRegisterErrors, registerUser} from "../store/actions/usersActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: `${theme.palette.grey["800"]} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(1, 0)} !important`,
        backgroundColor: `${theme.palette.grey["800"]} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
    },
    link: {
        marginTop: '5px'
    }
}));

const Register = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
        displayName: '',
        avatar: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = (name, value) => {
        setUser(prev => ({...prev, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser(prevState => ({...prevState, [name]: file}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });

        dispatch(registerUser(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6" sx={{marginBottom: '20px'}}>
                    Sign up
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <Grid item xs={12} sx={{marginTop: '10px'}}>
                        <FacebookLogin text="Login with facebook"/>
                    </Grid>

                    <Grid item xs={12} textAlign="center">
                        or
                    </Grid>

                    <FormElement
                        required={true}
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('username')}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('password')}
                    />

                    <FormElement
                        required={true}
                        label="Display name"
                        name="displayName"
                        value={user.displayName}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('displayName')}
                    />

                    <Grid item xs={12}>
                        <FileInput
                            label="Avatar"
                            name="avatar"
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item className={classes.link}>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;