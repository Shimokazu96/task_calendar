import React from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";

type Props = {
    title: string;
};

export default function Toolbar(title: Props) {
    return (
        <React.Fragment>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant="h4">
                    {title}
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button color="primary" variant="contained">
                        新規作成
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}
