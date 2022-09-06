import * as React from "react";
import { NavLink, useResolvedPath } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

export default function StickyFooter() {
    const resolvedLocation = useResolvedPath("");

    return (
        <>
            <Box
                component="footer"
                sx={{
                    width: "100%",
                    flexShrink: 0,
                    mt: "auto",
                    p: 0,
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[800]
                            : theme.palette.grey[800],
                }}
            >
                <List
                    sx={{
                        width: "100%",
                        height: "10%",
                        display: "flex",
                        p: 0,
                    }}
                >
                    <ListItem disablePadding>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "isActive" : "inactive"
                            }
                            to="/"
                        >
                            <ListItemButton
                                sx={{
                                    height: "100%",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[800],
                                        width: "auto",
                                        minWidth: 0,
                                        flexFlow: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <HomeIcon />
                                    <ListItemText
                                        sx={{
                                            display: "block",
                                            m: 0,
                                        }}
                                        primary="HOME"
                                        primaryTypographyProps={{
                                            color: "inherit",
                                            fontWeight: "medium",
                                            variant: "body2",
                                        }}
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem disablePadding>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "isActive" : "inactive"
                            }
                            to="/public_task"
                        >
                            <ListItemButton
                                sx={{
                                    height: "100%",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[800],
                                        width: "auto",
                                        minWidth: 0,
                                        flexFlow: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CalendarMonthIcon />
                                    <ListItemText
                                        sx={{
                                            display: "block",
                                            m: 0,
                                        }}
                                        primary="公開タスク"
                                        primaryTypographyProps={{
                                            color: "inherit",
                                            fontWeight: "medium",
                                            variant: "body2",
                                        }}
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    <ListItem disablePadding>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "isActive" : "inactive"
                            }
                            to="/mypage"
                        >
                            <ListItemButton
                                sx={{
                                    height: "100%",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[800],
                                        width: "auto",
                                        minWidth: 0,
                                        flexFlow: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <PersonIcon />
                                    <ListItemText
                                        sx={{
                                            display: "block",
                                            m: 0,
                                        }}
                                        primaryTypographyProps={{
                                            color: "inherit",
                                            fontWeight: "medium",
                                            variant: "body2",
                                        }}
                                        primary="マイページ"
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    {/* <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                height: "100%",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    width: "auto",
                                    minWidth: 0,
                                    flexFlow: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <HomeIcon />
                                <ListItemText
                                    sx={{
                                        display: "block",
                                    }}
                                    primary="ログアウト"
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </Box>
        </>
    );
}
