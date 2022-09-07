import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

type Props = {
    title: string;
};

export default function Header(props: Props) {
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ minHeight: "48px", height: "48px" }}>
                <Typography sx={{ flexGrow: 1 }}>{props.title}</Typography>
            </Toolbar>
        </AppBar>
    );
}
