import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LayersIcon from "@mui/icons-material/Layers";
import { Divider } from "@mui/material";

export default function MainListItems() {
    return (
        <React.Fragment>
            <Link to="/admin">
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="ダッシュボード" />
                </ListItemButton>
            </Link>
            <Link to="/admin/public_task">
                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary="公開タスク" />
                </ListItemButton>
            </Link>
            <Divider sx={{ my: 1 }} />

            <Link to="/admin/task">
                <ListItemButton>
                    <ListItemIcon>
                        <TaskIcon />
                    </ListItemIcon>
                    <ListItemText primary="タスク・マスター" />
                </ListItemButton>
            </Link>
            <Link to="/admin/section">
                <ListItemButton>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="セクション・マスター" />
                </ListItemButton>
            </Link>
            <Link to="/admin/user">
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="スタッフ" />
                </ListItemButton>
            </Link>
        </React.Fragment>
    );
}
