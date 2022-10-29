import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const PhotoItem = (props) => {
    return (
        <Card sx={{width: 220, marginRight: '30px', marginBottom: '20px'}}>
            <CardActionArea onClick={props.onClickPhoto}>
                <CardMedia
                    component="img"
                    height="200"
                    image={apiUrl + '/' + props.image}
                    alt="artist"
                />
            </CardActionArea>

            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h6" gutterBottom>
                    {props.title}
                </Typography>

                {
                    !props.withoutLink &&
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        display="block"
                        component={Link}
                        to={"/gallery/" + props.userId}
                        fontSize="16px"
                        gutterBottom
                    >
                        by {props.displayName}
                    </Typography>
                }

                <Grid item display="flex">
                    {(!props.published && props.role === 'admin') &&
                        <Button size="small" sx={{marginRight: '5px'}} color="primary" variant="outlined"
                                onClick={props.onPublishPhoto}>Publish</Button>}

                    {props.rightsToDelete &&
                        <Button size="small" variant="outlined" color="error"
                                onClick={props.onDeletePhoto}>Delete</Button>}


                </Grid>

                {(!props.published && props.rightsToCreateLink) &&
                    <Button size="small" sx={{marginTop: '5px'}} onClick={props.onCreateToken}>Create link</Button>
                }
            </CardContent>
        </Card>
    );
};

export default PhotoItem;