import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode, useState, useMemo, useContext, useEffect } from "react";
import {lightTheme, darkTheme} from "../Assets/Theme/Palette";
import useWindowDimensions from '../Utility/windowDimensions';

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "dark" | "light";
    drawerWidth: string;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const getLocalStorageTheme = () => {
    const lsTheme = localStorage.getItem("theme");
    return (lsTheme && lsTheme === "dark") ? "dark" : "light";
}

export const ColorModeContext = React.createContext<IColorModeContext>({
    toggleColorMode: () => {},
    mode: getLocalStorageTheme(),
    drawerWidth: '240px',
    isDrawerOpen: false,
    setIsDrawerOpen: () => {}
});



export const ColorModeProvider = ({children} : { children: ReactNode }) => {
    const { width } = useWindowDimensions();
    const drawerWidth = "240px";
    const [mode, setMode] = useState<"light" | "dark">(getLocalStorageTheme());
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(width >= 1536 ? true : false);

    useEffect(()=>{
        if(width <= 900) {
          setIsDrawerOpen(false);
        }
      }, [width])

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prev) => prev === "light" ? "dark" : "light");
            localStorage.setItem("theme", mode === "light" ? "dark" : "light");
        },
        mode
    }), [mode]);

    const theme = useMemo(()=> createTheme({
        palette: {
            mode,
            ...(mode === "light" ? lightTheme : darkTheme)
        }
    }), [mode]);


    return <ColorModeContext.Provider value={{...colorMode, drawerWidth, isDrawerOpen, setIsDrawerOpen}}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
};


export const useColorMode = () => {
    return useContext(ColorModeContext);
};