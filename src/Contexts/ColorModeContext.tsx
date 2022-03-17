import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode, useState, useMemo, useContext } from "react";
import {lightTheme, darkTheme} from "../Assets/Theme/Palette";

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "dark" | "light";
};

const getLocalStorageTheme = () => {
    const lsTheme = localStorage.getItem("theme");
    return (lsTheme && lsTheme === "dark") ? "dark" : "light";
}

export const ColorModeContext = React.createContext<IColorModeContext>({
    toggleColorMode: () => {},
    mode: getLocalStorageTheme()
});



export const ColorModeProvider = ({children} : { children: ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">(getLocalStorageTheme());

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


    return <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
};


export const useColorMode = () => {
    return useContext(ColorModeContext);
};