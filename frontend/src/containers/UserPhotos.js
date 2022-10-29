import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePhoto, getUserPhotos} from "../store/actions/photosActions";
import {Box, CardMedia, Grid, Modal, Typography} from "@mui/material";
import {apiUrl} from "../config";
import PhotoItem from "../components/PhotoItem/PhotoItem";
import {getUser} from "../store/actions/usersActions";

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
    const user = useSelector(state => state.users.user);
    const galleryUser = useSelector(state => state.users.selectedGalleryUser);
    const [open, setOpen] = useState(false);
    const [photoPath, setPhotoPath] = useState('');

    useEffect(() => {
        dispatch(getUserPhotos(match.params.id));
        dispatch(getUser(match.params.id));
    }, [dispatch]);

    const setOpenModal = path => {
        setOpen(true);
        setPhotoPath(path);
    };

    return galleryUser && (
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

            <Typography variant="h3" gutterBottom>
                <b>{galleryUser?.displayName}'s gallery</b>
            </Typography>

            <Grid container>
                {photos.map(photo => {
                    return (
                        <PhotoItem
                            key={photo._id}
                            title={photo.title}
                            displayName={photo.user.displayName}
                            image={photo.image}
                            withoutLink={true}
                            rightsToDelete={user._id === galleryUser._id}
                            onClickPhoto={() => setOpenModal(photo.image)}
                            onDeletePhoto={() => dispatch(deletePhoto(photo._id))}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default UserPhotos;