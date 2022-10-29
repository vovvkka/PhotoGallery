import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPrivatePhoto} from "../store/actions/photosActions";
import {Box, CardActionArea, CardMedia, Container, Modal, Typography} from "@mui/material";
import {apiUrl} from "../config";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PrivatePhoto = ({location}) => {
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photos.privatePhoto);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getPrivatePhoto(location.search));
    }, []);

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
                        height="600"
                        image={apiUrl + '/' + photo?.image}
                        alt="image"
                    />
                </Box>
            </Modal>

            <Container maxWidth="sm">
                <Typography textAlign="center" variant="h4" gutterBottom>
                    {photo?.title}
                </Typography>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={apiUrl + '/' + photo?.image}
                        alt="privatePhoto"
                        onClick={() => setOpen(true)}
                    />
                </CardActionArea>
            </Container>
        </>
    );
};

export default PrivatePhoto;