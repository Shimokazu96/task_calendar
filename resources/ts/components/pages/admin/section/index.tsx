import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Section } from "@/types/Section";
import MUIDataTable from "mui-datatables";
import {
    IconButton,
    Box,
    Button,
    Typography,
    ListItemIcon,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dashboard from "@/components/templates/admin/Dashboard";
import useDataTable from "@/hooks/useDataTable";

const columns = [
    // 非表示の列 sortに利用している
    {
        name: "id",
        label: "ID",
        // filterにも入れない
        options: { filter: true },
    },
    {
        name: "section_name",
        label: "セクション名",
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
                const [menuFlag, setMenuFlag] = React.useState(false);
                const [editFlag, setEditFlag] = React.useState(false);

                const [anchorEl, setAnchorEl] =
                    React.useState<null | HTMLElement>(null);

                const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
                    setAnchorEl(event.currentTarget);
                };
                const handleEditClickOpen = () => {
                    setEditFlag(true);
                    setAnchorEl(null);
                };
                const handleEditClickClose = () => {
                    setEditFlag(false);
                };
                const handleMenuClose = () => {
                    setAnchorEl(null);
                };
                return (
                    // <EditDialog
                    //     editData={{
                    //         id: exampleData[dataIndex].id,
                    //         test_code: exampleData[dataIndex].test_code,
                    //         remarks: exampleData[dataIndex].remarks,
                    //     }}
                    // />
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
                            <MenuItem onClick={handleEditClickOpen}>
                                <ListItemIcon>
                                    <EditOutlinedIcon width={24} height={24} />
                                </ListItemIcon>
                                編集
                            </MenuItem>
                            <MenuItem
                                sx={{ color: "error.main" }}
                                onClick={handleMenuClose}
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
                        <Dialog
                            fullWidth={true}
                            maxWidth={"xl"}
                            open={editFlag}
                            onClose={handleEditClickClose}
                        >
                            <DialogTitle>スタッフ作成</DialogTitle>
                            <DialogContent>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="名前"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="メールアドレス"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="パスワード"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password-confirmation"
                                    label="パスワード確認用"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditClickClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleMenuClose}>
                                    Subscribe
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                );
            },
        },
    },
];


const UserPage: React.FC = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const { options } = useDataTable();

    const getSections = async () => {
        await axiosApi
            .get("/api/admin/section")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setSections(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return sections;
    };

    useEffect(() => {
        getSections();
    }, []);
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
                        セクション・マスター
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Button color="primary" variant="contained">
                        新規作成
                    </Button>
                </Box>
            </Box>
            <MUIDataTable
                title={""}
                data={sections}
                columns={columns}
                options={options}
            />
        </Dashboard>
    );
};
export default UserPage;
