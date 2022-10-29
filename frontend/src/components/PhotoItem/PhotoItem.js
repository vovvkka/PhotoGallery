import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const PhotoItem = ({title, image, displayName, onClickPhoto}) => {
    return (
        <Card sx={{maxWidth: 200, marginRight: '30px', marginBottom: '20px'}}>
            <CardActionArea onClick={onClickPhoto}>
                <CardMedia
                    component="img"
                    height="200"
                    image={apiUrl + '/' + image}
                    alt="artist"
                />
            </CardActionArea>

            <CardContent>
                <Typography variant="h6" component="div" textAlign="center">
                    {title}
                </Typography>
                <Typography variant="h6" color="text.secondary" textAlign="center" fontSize="16px">
                    by {displayName}
                </Typography>
            </CardContent>


        </Card>
    );
};

export default PhotoItem;