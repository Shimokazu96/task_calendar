import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
type Props = {
    title: string;
    link: string;
};

export default function Header(props: Props) {
    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: "48px",
                    height: "48px",
                }}
            >
                {props.link ? (
                    <Link to={props.link}>
                        <ArrowBackIosNewIcon />
                    </Link>
                ) : (
                    <Typography sx={{ flexGrow: 0 }}>　</Typography>
                )}

                <Typography sx={{ flexGrow: 0 }}>{props.title}</Typography>
                <Typography sx={{ flexGrow: 0 }}>　</Typography>
            </Toolbar>
        </AppBar>
    );
}
