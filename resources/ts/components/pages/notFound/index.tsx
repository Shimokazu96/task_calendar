import React from "react";
import { Link, Box, Typography, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Not Found
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography>ページが見つかりませんでした。</Typography>
                </Box>
                <Link component={RouterLink} to="/login" sx={{ mt: 1 }}>
                    TOPに戻る
                </Link>
            </Box>
        </Container>
    );
};
export default NotFound;
