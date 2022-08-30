import * as React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

export default function CircularIndeterminate({ open }: { open: boolean }) {
    return (
        <Backdrop
            open={open}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
