import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPrivatePhoto} from "../store/actions/photosActions";
import {CardMedia, Container} from "@mui/material";
import {apiUrl} from "../config";

const PrivatePhoto = ({location}) => {
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photos.privatePhoto);

    useEffect(() => {
        dispatch(getPrivatePhoto(location.search));
    }, []);

    return (
        <Container maxWidth="sm">
            <CardMedia
                component="img"
                image={apiUrl + '/' + photo?.image}
                alt="privatePhoto"
            />
        </Container>
    );
};

export default PrivatePhoto;