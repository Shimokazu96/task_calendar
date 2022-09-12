import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import useUserAuth from "@/hooks/useUserAuth";

export default function MyPageList() {
    const { logout } = useUserAuth();

    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List>
                <Link to="/mypage/applied_task">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="希望を出しているタスク" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/mypage/fixed_task">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="確定しているタスク" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/mypage/setting">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="アカウント設定" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem onClick={logout} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="ログアウト" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}
