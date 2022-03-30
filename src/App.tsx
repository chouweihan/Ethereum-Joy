import React, { useState, useEffect } from "react";
import { WalletProvider } from "./Contexts/WalletContext";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import ApplicationRoutes from "./Components/Shared/ApplicationRoutes";
import { ColorModeProvider } from "./Contexts/ColorModeContext";
import { SnackbarProvider } from "notistack";
import SideDrawer from "./Components/Shared/SideDrawer";
import { Box } from "@mui/system";
import PageWrapper from "./Components/Shared/PageWrapper";


function App() {


  return (
    <ColorModeProvider>
      <SnackbarProvider maxSnack={10} >
        <WalletProvider>
          <Router>
            <Navbar />
            <Box sx={{ display: "flex" }}>
              <SideDrawer />
              <PageWrapper>
                <ApplicationRoutes />
              </PageWrapper>
            </Box>
          </Router>
        </WalletProvider>
      </SnackbarProvider>
    </ColorModeProvider>
  );
}

export default App;
