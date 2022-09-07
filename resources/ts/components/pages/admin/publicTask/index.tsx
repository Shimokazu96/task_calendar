import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { PublicTask } from "@/types/PublicTask";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
    IconButton,
    Box,
    Button,
    Typography,
    ListItemIcon,
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

const PublicTaskPage: React.FC = () => {
    const { options } = useDataTable();
    const [publicTasks, setPublicTasks] = useState<PublicTask[]>([]);
    const [loading, setLoading] = useState(true);
    const { deleted } = useNotification();

    const getPublicTasks = async () => {
        await axiosApi
            .get("/api/admin/public_task")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTasks(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks();
    }, []);

    const columns = [
        // 非表示の列 sortに利用している
        {
            name: "id",
            label: "ID",
            options: { filter: true },
        },
        {
            name: "date",
            label: "日付",
            options: { filter: true },
        },
        {
            name: "start_time",
            label: "作業時間",
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {publicTasks[dataIndex].start_time}~
                            {publicTasks[dataIndex].end_time}
                        </>
                    );
                },
            },
        },
        {
            name: "task_id",
            label: "タスク名",
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex: number) => {
                    return <>{publicTasks[dataIndex].task.task_name}</>;
                },
            },
        },
        {
            name: "section_id",
            label: "セクション名",
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex: number) => {
                    return <>{publicTasks[dataIndex].section.section_name}</>;
                },
            },
        },
        {
            name: "required_personnel",
            label: "必要人数",
            options: { filter: false },
        },
        {
            name: "determined_personnel",
            label: "確定人数",
            options: { filter: false },
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
                            .delete(`/api/admin/public_task/${id}`)
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                deleted();
                                getPublicTasks();
                                handleMenuClose();
                                handleDeleteDialogClose();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return publicTasks;
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
                                        "/admin/public_task/" +
                                        publicTasks[dataIndex].id
                                    }
                                >
                                    <MenuItem onClick={handleEditClickOpen}>
                                        <ListItemIcon>
                                            <EditOutlinedIcon
                                                width={24}
                                                height={24}
                                            />
                                        </ListItemIcon>
                                        詳細
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
                                    onDelete(publicTasks[dataIndex].id)
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
                        公開タスク
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Link to={"/admin/public_task/create"}>
                        <Button color="primary" variant="contained">
                            新規作成
                        </Button>
                    </Link>
                </Box>
            </Box>
            <MUIDataTable
                title={""}
                data={publicTasks}
                columns={columns}
                options={options}
            />
        </>
    );
};
export default PublicTaskPage;
