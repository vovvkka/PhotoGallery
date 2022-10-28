import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Anonymous = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit" sx={{fontWeight: 'bold'}}>
        Sign Up
      </Button>
      <Button component={Link} to="/login" color="inherit" sx={{fontWeight: 'bold'}}>
        Sign In
      </Button>
    </>
  );
};

export default Anonymous;