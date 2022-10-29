import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import FormElement from "../components/UI/Form/FormElement";
import FileInput from "../components/UI/Form/FileInput";
import {useDispatch, useSelector} from "react-redux";
import {clearPhotoErrors, newPhoto} from "../store/actions/photosActions";
import Spinner from "../components/UI/Spinner/Spinner";


const NewPhoto = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.photos.addPhotoLoading);
    const error = useSelector(state => state.photos.addPhotoError);
    const [photoData, setPhotoData] = useState({
        title: '',
        image: ''
    });

    useEffect(() => {
        return () => {
            dispatch(clearPhotoErrors());
        };
    }, [dispatch]);

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;

        setPhotoData(prev => ({...prev, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setPhotoData(prevState => ({...prevState, [name]: file}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(photoData).forEach(key => {
            formData.append(key, photoData[key]);
        });

        dispatch(newPhoto(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            <Spinner show={loading}/>

            <Container maxWidth="sm">
                <form onSubmit={submitFormHandler}>
                    <Typography variant='h5' paddingY='20px'>
                        Add Cocktail
                    </Typography>

                    <Grid container direction='column' rowSpacing={2}>
                        <Grid item>
                            <FormElement
                                required={true}
                                onChange={inputChangeHandler}
                                name='title'
                                label='Title'
                                value={photoData.title}
                                error={getFieldError('title')}
                            />
                        </Grid>

                        <Grid item>
                            <FileInput
                                required={true}
                                name='image'
                                label='Photo'
                                onChange={fileChangeHandler}
                                error={getFieldError('image')}
                            />
                        </Grid>

                        <Grid item>
                            <Button type="submit" variant="contained" sx={{background: '#212121 !important'}}>
                                Add Photo
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default NewPhoto;