import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    IconButton,
    Container,
    ListItemIcon,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, Outlet } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideBarList from "@/components/templates/admin/SideBarList";
import useUserAuth from "@/hooks/useUserAuth";
import useWindowSize from "@/hooks/useWindowSize";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "@/components/templates/front/Footer";

const mdTheme = createTheme();

const Layout: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = useState(true);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { logout } = useUserAuth();
    const [width, height] = useWindowSize();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
                <Footer></Footer>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
