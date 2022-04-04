import React from "react";
import Metamask from "./Metamask";
import { AppBar, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useColorMode } from "../../Contexts/ColorModeContext";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Theme, useTheme, Tooltip } from "@mui/material";
import useWindowDimensions from "../../Utility/windowDimensions";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar = () => {
  const { mode, toggleColorMode, isDrawerOpen, setIsDrawerOpen, drawerWidth } = useColorMode();
  const { width } = useWindowDimensions();
  const theme: Theme = useTheme();

  return (
      <AppBar
        position="fixed"
        sx={{
          boxShadow: theme.shadows[1],
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isDrawerOpen && {
            width: `calc(100% - ${drawerWidth})`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpen(true)}
            edge="start"
            sx={{
              marginRight: 2,
              ...((isDrawerOpen || width <= 900) && {
                display: "none",
              }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              {width > 500 ? "Ethereum Joy" : "Eth Joy"}
            </NavLink>
          </Typography>
          <Metamask />
          <Tooltip title={mode !== "light" ? "Light theme" : "Dark theme"}>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
