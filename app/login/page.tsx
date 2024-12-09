"use client";
import React from "react";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import AnimationPage from "../components/AnimationPage/page";
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <AnimationPage>
      <Box className='flex'>
        <Image
          src='/images/login-image.jpg' // Path from the public directory
          alt='Login Image'
          width={1080}
          height={2000} // Specify the width of the image
          className='h-screen w-[50%] object-cover'
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField id='filled-basic' variant='filled' />
          <TextField id='filled-basic' variant='filled' />
          <Button variant='outlined'>Submit</Button>
        </Box>
      </Box>
    </AnimationPage>
  );
};

export default Login;
