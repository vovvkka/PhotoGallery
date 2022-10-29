import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserPhotos} from "../store/actions/photosActions";
import {Box, CardMedia, Grid, Modal, Typography} from "@mui/material";
import {apiUrl} from "../config";
import PhotoItem from "../components/PhotoItem/PhotoItem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const UserPhotos = ({match}) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);
    const [open, setOpen] = useState(false);
    const [photoPath, setPhotoPath] = useState('');

    useEffect(() => {
        dispatch(getUserPhotos(match.params.id));
    }, [dispatch]);

    const setOpenModal = path => {
        setOpen(true);
        setPhotoPath(path);
    };
    
    return (
        <>
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
                <Typography variant="h3">

                </Typography>

                {photos.map(photo => {
                    return (
                        <PhotoItem
                            key={photo._id}
                            title={photo.title}
                            displayName={photo.user.displayName}
                            image={photo.image}
                            onClickPhoto={() => setOpenModal(photo.image)}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default UserPhotos;