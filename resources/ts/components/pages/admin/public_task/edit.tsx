import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import useNotification from "@/hooks/useNotification";
import { PublicTask } from "@/types/PublicTask";
import { User } from "@/types/User";
import { Box, Typography, Chip, CircularProgress, Button } from "@mui/material";
import Dashboard from "@/components/templates/admin/Dashboard";
import PublicTaskCard from "@/components/templates/admin/PublicTaskCard";
import MUIDataTable from "mui-datatables";
import useDataTable from "@/hooks/useDataTable";

const options = {
    filter: false as any,
    sort: false,
    print: false as any,
    viewColumns: false as any,
    download: false as any,
    selectableRows: "none" as any,
};
const EditPublicTaskPage: React.FC = () => {
    const params = useParams(); // URLのパスパラメータを取得。例えば、 /uses/2 なら、2の部分を取得
    const navigate = useNavigate();
    const { error } = useNotification();
    const [users, setUsers] = useState<User[]>([]);
    const getUsers = async () => {
        await axiosApi
            .get("/api/admin/user")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return users;
    };

    const [publicTask, setPublicTask] = useState<PublicTask>({
        id: 0,
        task_id: 0,
        section_id: 0,
        required_personnel: 0,
        determined_personnel: 0,
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        created_at: "",
        updated_at: "",
        task: {
            task_name: "",
        },
        section: {
            section_name: "",
        },
    });

    const columns = [
        {
            name: "name",
            label: "名前",
            options: { filter: true },
        },
        {
            name: "status",
            label: "ステータス",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {users[dataIndex].fixed_public_task ? (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="確定"
                                    color="primary"
                                />
                            ) : (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="未確定"
                                    color="default"
                                />
                            )}
                        </>
                    );
                },
            },
        },
        {
            name: "",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const fixPublicTask = (id: number) => {
                        axiosApi
                            .post(
                                `/api/admin/public_task/${params.id}/fix/${id}`
                            )
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                if(response.data == "over_capacity") {
                                    error('これ以上人数を増やせません。')
                                }
                                getUsers();
                                getPublicTask();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return users;
                    };
                    const cancelPublicTask = (id: number) => {
                        axiosApi
                            .post(
                                `/api/admin/public_task/${params.id}/cancel/${id}`
                            )
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                getUsers();
                                getPublicTask();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return users;
                    };

                    return (
                        <>
                            {users[dataIndex].fixed_public_task ? (
                                <Button
                                    color="inherit"
                                    variant="contained"
                                    onClick={() =>
                                        cancelPublicTask(users[dataIndex].id)
                                    }
                                >
                                    確定済み
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() =>
                                        fixPublicTask(users[dataIndex].id)
                                    }
                                >
                                    確定する
                                </Button>
                            )}
                        </>
                    );
                },
            },
        },
        {
            name: "タスク完了報告",
            options: { filter: true },
        },
    ];

    const [loading, setLoading] = useState(true);

    const getPublicTask = async () => {
        await axiosApi
            .get(`/api/admin/public_task/${params.id}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTask(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTask;
    };

    useEffect(() => {
        getUsers();
        getPublicTask();
    }, []);
    console.log(publicTask);
    if (loading) {
        return (
            <Dashboard title="">
                <CircularProgress />
            </Dashboard>
        );
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
                        公開タスク詳細
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mb: 4 }}>
                <PublicTaskCard publicTask={publicTask} />
            </Box>
            <MUIDataTable
                title={"申請スタッフ一覧"}
                data={users}
                columns={columns}
                options={options}
            />
        </Dashboard>
    );
};
export default EditPublicTaskPage;
