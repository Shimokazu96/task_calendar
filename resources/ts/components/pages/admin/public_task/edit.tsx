import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import useNotification from "@/hooks/useNotification";
import { PublicTask, Validation, Form } from "@/types/PublicTask";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
    Container,
    CircularProgress,
} from "@mui/material";
import Dashboard from "@/components/templates/admin/Dashboard";

const EditPublicTaskPage: React.FC = () => {
    const params = useParams(); // URLのパスパラメータを取得。例えば、 /uses/2 なら、2の部分を取得
    const navigate = useNavigate();
    const { updated } = useNotification();

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
            <Container component="main" maxWidth={false} sx={{ mb: 4 }}>
                <Card>
                    <CardContent>
                        <Grid
                            container
                            sx={{
                                display: "flex",
                            }}
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    作業日時
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.date}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    作業時間
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.start_time}~
                                    {publicTask.end_time}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid
                            container
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    作業時間
                                </Typography>
                                {/* <Chip
                                color="primary"
                                label={publicTask.section.section_name}
                            /> */}
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.section.section_name}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    タスク
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.task.task_name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />

                        <Grid
                            container
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    必要人数
                                </Typography>

                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.required_personnel}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    確定人数
                                </Typography>

                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        m: 0,
                                        p: 2,
                                    }}
                                >
                                    {publicTask.determined_personnel}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Dashboard>
    );
};
export default EditPublicTaskPage;
