import * as React from "react";
import Dashboard from "@/components/templates/admin/Dashboard";
import { CircularProgress, Backdrop } from "@mui/material";

export default function CircularIndeterminate({ open }: { open: boolean }) {
    return (
        <Dashboard>
            <Backdrop
                open={open}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dashboard>
    );
}
