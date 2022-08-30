import * as React from "react";
import { NavLink, useResolvedPath } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LayersIcon from "@mui/icons-material/Layers";
import { Divider, Tooltip } from "@mui/material";

export default function MainListItems({ open }: { open: boolean }) {
    const resolvedLocation = useResolvedPath("");
    return (
        <React.Fragment>
            <Tooltip
                disableHoverListener={!open ? false : true}
                placement="right"
                title="ダッシュボード"
            >
                <NavLink
                    className={() =>
                        resolvedLocation.pathname == "/admin" ||
                        resolvedLocation.pathname.indexOf("/admin/date") > -1
                            ? " sidebarActivated"
                            : ""
                    }
                    to="/admin"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="ダッシュボード" />
                    </ListItemButton>
                </NavLink>
            </Tooltip>
            <Tooltip
                disableHoverListener={!open ? false : true}
                placement="right"
                title="公開タスク"
            >
                <NavLink
                    className={({ isActive }) =>
                        isActive ? " sidebarActivated" : ""
                    }
                    to="/admin/public_task"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText primary="公開タスク" />
                    </ListItemButton>
                </NavLink>
            </Tooltip>
            <Divider sx={{ my: 1 }} />
            <Tooltip
                disableHoverListener={!open ? false : true}
                placement="right"
                title="タスク・マスター"
            >
                <NavLink
                    className={({ isActive }) =>
                        isActive ? " sidebarActivated" : ""
                    }
                    to="/admin/task"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="タスク・マスター" />
                    </ListItemButton>
                </NavLink>
            </Tooltip>
            <Tooltip
                disableHoverListener={!open ? false : true}
                placement="right"
                title="セクション・マスター"
            >
                <NavLink
                    className={({ isActive }) =>
                        isActive ? " sidebarActivated" : ""
                    }
                    to="/admin/section"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="セクション・マスター" />
                    </ListItemButton>
                </NavLink>
            </Tooltip>
            <Tooltip
                disableHoverListener={!open ? false : true}
                placement="right"
                title="スタッフ"
            >
                <NavLink
                    className={({ isActive }) =>
                        isActive ? " sidebarActivated" : ""
                    }
                    to="/admin/user"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="スタッフ" />
                    </ListItemButton>
                </NavLink>
            </Tooltip>
        </React.Fragment>
    );
}
