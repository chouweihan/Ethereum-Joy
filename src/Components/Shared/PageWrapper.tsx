import React, { ReactNode } from "react";
import { DrawerHeader } from "./SideDrawer";
import AddressBar from "./AddressBar";
import { Container, useTheme, Box } from "@mui/material";

const PageWrapper = ({ children } : { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      bgcolor={theme.palette.background.default}
    >
      <DrawerHeader />
      <Container maxWidth="xl">
        <AddressBar />
        {children}
      </Container>
      <DrawerHeader />
    </Box>
  );
};

export default PageWrapper;
