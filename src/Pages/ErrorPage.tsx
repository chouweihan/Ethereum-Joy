import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box sx={{width: "100%", pt: 5}} display="flex" justifyContent="center">
        <Stack spacing={2}>
          <Typography fontSize={80} sx={{fontFamily: "'Open Sans', sans-serif"}} color='primary'>
              404
          </Typography>
          <Typography fontSize={16}>
            Sorry, page not found 
          </Typography>
        </Stack>
    </Box>
    );
};

export default ErrorPage;
