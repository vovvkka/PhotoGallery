import React, {useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import FormElement from "../components/UI/Form/FormElement";
import FileInput from "../components/UI/Form/FileInput";


const NewPhoto = () => {
    const [photoData, setPhotoData] = useState({
        title: '',
        image: ''
    });

    const inputChangeHandler = (name, value) => {
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

        // dispatch(registerUser(formData));
    };

    const getFieldError = fieldName => {
        try {
            // return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={submitFormHandler}>
                <Typography variant='h5' paddingY='20px'>
                    Add Cocktail
                </Typography>

                <Grid container direction='column' rowSpacing={2}>
                    <Grid item>
                        <FormElement
                            onChange={inputChangeHandler}
                            name='title'
                            label='Title'
                            value={photoData.title}
                            required={true}
                            error={getFieldError('title')}
                        />
                    </Grid>

                    <Grid item>
                        <FileInput
                            name='image'
                            label='Photo'
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item>
                        <Button type="submit" variant="contained" sx={{background: '#212121 !important'}}>Add
                            Photo</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default NewPhoto;