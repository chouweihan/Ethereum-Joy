import React, { ReactNode } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/system";
import { DrawerHeader } from "./SideDrawer";
import AddressBar from "./AddressBar";
import { Container } from "@mui/material";
const PageWrapper = ({ children }: { children: ReactNode }) => {
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
    </Box>
  );
};

export default PageWrapper;
