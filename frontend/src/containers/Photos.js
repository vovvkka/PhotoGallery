import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../store/actions/photosActions";
import {Box, CardMedia, Grid, Modal} from "@mui/material";
import PhotoItem from "../components/PhotoItem/PhotoItem";
import {apiUrl} from "../config";
import Spinner from "../components/UI/Spinner/Spinner";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Photos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);
    const loading = useSelector(state => state.photos.fetchLoading);

    const [open, setOpen] = useState(false);
    const [photoPath, setPhotoPath] = useState('');

    const setOpenModal = path => {
        setOpen(true);
        setPhotoPath(path);
    };

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    return (
        <>
            <Spinner show={loading}/>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={apiUrl + '/' + photoPath}
                        alt="image"
                    />
                </Box>
            </Modal>

            <Grid container>
                {photos.map(photo => (
                    <PhotoItem
                        key={photo._id}
                        userId={photo.user._id}
                        title={photo.title}
                        displayName={photo.user.displayName}
                        image={photo.image}
                        onClickPhoto={() => setOpenModal(photo.image)}
                    />
                ))}
            </Grid>
        </>
    );
};

export default Photos;