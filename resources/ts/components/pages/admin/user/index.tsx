import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { User } from "@/types/User";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
    IconButton,
    Box,
    Button,
    Typography,
    ListItemIcon,
    Chip,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dashboard from "@/components/templates/admin/Dashboard";
import DeleteDialog from "@/components/templates/admin/DeleteDialog";
import useDataTable from "@/hooks/useDataTable";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";

const UserPage: React.FC = () => {
    const { options } = useDataTable();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { deleted } = useNotification();

    const getUsers = async () => {
        await axiosApi
            .get("/api/admin/user")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return users;
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        // 非表示の列 sortに利用している
        {
            name: "id",
            label: "ID",
            options: { filter: true },
        },
        {
            name: "name",
            label: "名前",
            options: { filter: true },
        },
        {
            name: "email",
            label: "メールアドレス",
            options: { filter: true },
        },
        {
            name: "email",
            label: "メールアドレス",
            options: { filter: true },
        },
        {
            name: "email_verified_at",
            label: "メールアドレス認証",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {users[dataIndex].email_verified_at ? (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="認証済み"
                                    color="success"
                                />
                            ) : (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="認証前"
                                    color="default"
                                />
                            )}
                        </>
                    );
                },
            },
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
                            .delete(`/api/admin/user/${id}`)
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                deleted();
                                getUsers();
                                handleMenuClose();
                                handleDeleteDialogClose();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return users;
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
                                <Link to={"/admin/user/" + users[dataIndex].id}>
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
                                DeleteData={() => onDelete(users[dataIndex].id)}
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
        <Dashboard title="">
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
                        スタッフ
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Link to={"/admin/user/create"}>
                        <Button color="primary" variant="contained">
                            新規作成
                        </Button>
                    </Link>
                </Box>
            </Box>
            <MUIDataTable
                title={""}
                data={users}
                columns={columns}
                options={options}
            />
        </Dashboard>
    );
};
export default UserPage;
