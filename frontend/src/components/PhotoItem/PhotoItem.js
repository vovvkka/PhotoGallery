import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const PhotoItem = ({userId, title, image, displayName, onClickPhoto, withoutLink, rightsToDelete, onDeletePhoto}) => {
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

            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>

                {
                    !withoutLink &&
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        display="block"
                        component={Link}
                        to={"/gallery/" + userId}
                        fontSize="16px"
                    >
                        by {displayName}
                    </Typography>
                }

                {rightsToDelete && <Button size="medium" color="error" onClick={onDeletePhoto}>Delete</Button>}
            </CardContent>
        </Card>
    );
};

export default PhotoItem;