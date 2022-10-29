import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const PhotoItem = ({userId, title, image, displayName, onClickPhoto, withoutLink}) => {
    return (
        <Card sx={{width: 200, marginRight: '30px', marginBottom: '20px'}}>
            <CardActionArea onClick={onClickPhoto}>
                <CardMedia
                    component="img"
                    height="200"
                    image={apiUrl + '/' + image}
                    alt="artist"
                />
            </CardActionArea>

            <CardContent>
                <Typography variant="h6" textAlign="center">
                    {title}
                </Typography>
                {
                    !withoutLink &&
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        display="block"
                        textAlign="center"
                        component={Link}
                        to={"/gallery/" + userId}
                        fontSize="16px"
                    >
                        by {displayName}
                    </Typography>
                }
            </CardContent>
        </Card>
    );
};

export default PhotoItem;