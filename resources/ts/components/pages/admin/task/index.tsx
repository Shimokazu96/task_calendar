import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Task } from "@/types/Task";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
    IconButton,
    Box,
    Button,
    Typography,
    ListItemIcon,
    Chip
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteDialog from "@/components/templates/admin/DeleteDialog";
import useDataTable from "@/hooks/useDataTable";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";

const TaskPage: React.FC = () => {
    const { options } = useDataTable();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const { deleted } = useNotification();

    const getTasks = async () => {
        await axiosApi
            .get("/api/admin/task")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setTasks(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return tasks;
    };

    useEffect(() => {
        getTasks();
    }, []);

    const columns = [
        // 非表示の列 sortに利用している
        {
            name: "id",
            label: "ID",
            options: { filter: true },
        },
        {
            name: "display_flag",
            label: "表示・非表示",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {tasks[dataIndex].display_flag ? (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="表示"
                                    color="info"
                                />
                            ) : (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="非表示"
                                    color="default"
                                />
                            )}
                        </>
                    );
                },
            },
        },
        {
            name: "task_name",
            label: "タスク名",
            options: { filter: true },
        },
        // 編集アイコンを表示
        {
            name: "",
            options: {
                filter: false, // filterには入れない
                sort: false, // sortにも入れない
                download: false, // CSVにも入れない
                // 編集コンポーネント（列の値情報を渡している）
                customBodyRenderLite: (dataIndex: number) => {
                    const [editFlag, setEditFlag] = React.useState(false);
                    const [deleteFlag, setDeleteFlag] = React.useState(false);

                    const [anchorEl, setAnchorEl] =
                        React.useState<null | HTMLElement>(null);

                    const handleMenu = (
                        event: React.MouseEvent<HTMLElement>
                    ) => {
                        setAnchorEl(event.currentTarget);
                    };
                    const handleMenuClose = () => {
                        setAnchorEl(null);
                    };
                    const handleEditClickOpen = () => {
                        setEditFlag(true);
                        setAnchorEl(null);
                    };
                    const handleDeleteDialogOpen = () => {
                        setDeleteFlag(true);
                    };

                    const handleDeleteDialogClose = () => {
                        setDeleteFlag(false);
                    };

                    const onDelete = (id: number) => {
                        axiosApi
                            .delete(`/api/admin/task/${id}`)
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                deleted();
                                getTasks();
                                handleMenuClose();
                                handleDeleteDialogClose();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return tasks;
                    };

                    return (
                        <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MoreVertOutlinedIcon />
                            </IconButton>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <Link
                                    to={
                                        "/admin/task/" +
                                        tasks[dataIndex].id
                                    }
                                >
                                    <MenuItem onClick={handleEditClickOpen}>
                                        <ListItemIcon>
                                            <EditOutlinedIcon
                                                width={24}
                                                height={24}
                                            />
                                        </ListItemIcon>
                                        編集
                                    </MenuItem>
                                </Link>
                                <MenuItem
                                    sx={{ color: "error.main" }}
                                    onClick={() => handleDeleteDialogOpen()}
                                >
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon
                                            sx={{ color: "error.main" }}
                                            width={24}
                                            height={24}
                                        />
                                    </ListItemIcon>
                                    削除
                                </MenuItem>
                            </Menu>
                            <DeleteDialog
                                open={deleteFlag}
                                close={() => handleDeleteDialogClose()}
                                DeleteData={() =>
                                    onDelete(tasks[dataIndex].id)
                                }
                            />
                        </>
                    );
                },
            },
        },
    ];

    if (loading) {
        return <Loading open={loading} />;
    }

    return (
        <>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    m: -1,
                    mb: 2,
                }}
            >
                <Box sx={{ m: 1 }}>
                    <Typography
                        sx={{ m: 1, fontWeight: "bold" }}
                        component="h2"
                        variant="h5"
                    >
                        タスク・マスター
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Link to={"/admin/task/create"}>
                        <Button color="primary" variant="contained">
                            新規作成
                        </Button>
                    </Link>
                </Box>
            </Box>
            <MUIDataTable
                title={""}
                data={tasks}
                columns={columns}
                options={options}
            />
        </>
    );
};
export default TaskPage;
