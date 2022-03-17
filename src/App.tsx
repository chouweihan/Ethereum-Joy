import React, { useState, useEffect } from "react";
import { WalletProvider } from "./Contexts/WalletContext";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import ApplicationRoutes from "./Components/Shared/ApplicationRoutes";
import { ColorModeProvider } from "./Contexts/ColorModeContext";
import { SnackbarProvider } from "notistack";
import SideDrawer from "./Components/Shared/SideDrawer";
import useWindowDimensions from "./Utility/windowDimensions";
import { Box } from "@mui/system";
import PageWrapper from "./Components/Shared/PageWrapper";

const drawerWidth = "240px";

function App() {
  const { width } = useWindowDimensions();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(width >= 1536 ? true : false);

  useEffect(()=>{
    if(width <= 900) {
      setIsDrawerOpen(false);
    }
  }, [width])

  return (
    <ColorModeProvider>
      <SnackbarProvider maxSnack={10} >
        <WalletProvider>
          <Router>
            <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} drawerWidth={drawerWidth}/>
            <Box sx={{ display: "flex" }}>
              <SideDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} drawerWidth={drawerWidth} />
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
