import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSize";
import Footer from "@/components/templates/front/Footer";
import Loading from "@/components/parts/Loading";

const mdTheme = createTheme();

const Layout: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = useState(true);
    const [width, height] = useWindowSize();

    useEffect(() => {
        if (width == 0) {
            return setOpen(true);
        }
        if (width < 768) {
            setOpen(false);
            return setLoading(false);
        }
        setOpen(true);
        return setLoading(false);
    }, [width]);

    if (loading) {
        return <></>;
    }
    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Suspense fallback={<Loading open={open} />}>
                    <Outlet />
                </Suspense>
                <Footer></Footer>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
