import React, { ReactNode } from "react"
import { useTheme } from "@mui/material";


const HighlightText = ({ children, style } : { children?: ReactNode, style?: React.CSSProperties }) => {

    const theme = useTheme();

    return (
        <span style={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: "20px",
                ...style

        }}>
            {children && children}
        </span>
    );
}

export default HighlightText;