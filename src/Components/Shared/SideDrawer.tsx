import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  IconButton,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Theme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { drawerLinks } from "../../Assets/Data/DrawerLinks";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link } from "@mui/material";
import { useColorMode } from "../../Contexts/ColorModeContext";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme, drawerWidth: string) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const SideDrawer = () => {
  const theme: Theme = useTheme();
  const location = useLocation();
  const { mode, isDrawerOpen, setIsDrawerOpen, drawerWidth } = useColorMode();

  return (
    <MuiDrawer
      open={isDrawerOpen}
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(isDrawerOpen && {
          ...openedMixin(theme, drawerWidth),
          "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
        }),
        ...(!isDrawerOpen && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerLinks.map((link, index) => {
          return (
            <Tooltip key={index} title={link.label} placement="right">
              <Link component={RouterLink} to={link.url} color="inherit" underline="none">
                <ListItemButton sx={{ mt: 1, 
                ...(location.pathname === link.url && 
                {backgroundColor: mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800] })
                }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ml: 1 / 2,
                      mr: isDrawerOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: theme.palette.primary.main
                    }}
                    >
                    <link.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                    />
                </ListItemButton>
              </Link>
            </Tooltip>
          );
        })}
      </List>
      <Divider/>
      <List>
            <Tooltip title="About" placement="right">
              <Link component={RouterLink} to="/about" color="inherit" underline="none">
                <ListItemButton sx={{ 
                  mt: 1, 
                  ...(location.pathname === "/about" && 
                  {backgroundColor: mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800] })
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ml: 1 / 2,
                      mr: isDrawerOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: theme.palette.primary.main
                    }}
                    >
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="About"
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                    />
                </ListItemButton>
              </Link>
            </Tooltip>
      </List>
    </MuiDrawer>
  );
};

export default SideDrawer;
