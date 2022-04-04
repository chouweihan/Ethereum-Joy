import React from "react";
import { WalletProvider } from "./Contexts/WalletContext";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import ApplicationRoutes from "./Components/Shared/ApplicationRoutes";
import { ColorModeProvider } from "./Contexts/ColorModeContext";
import { SnackbarProvider } from "notistack";
import SideDrawer from "./Components/Shared/SideDrawer";
import { Box } from "@mui/system";
import PageWrapper from "./Components/Shared/PageWrapper";
import { MoralisProvider } from "react-moralis";

function App() {

  const mAppId = process.env.REACT_APP_MORALIS_APP_ID as string;
  const mServerURL = process.env.REACT_APP_MORALIS_SERVER_URL as string;

  return (
    <MoralisProvider appId={mAppId} serverUrl={mServerURL}>
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
    </MoralisProvider>
  );
}

export default App;
