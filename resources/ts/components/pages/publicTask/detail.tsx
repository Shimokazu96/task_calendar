import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { setYear, setMonth, setDay } from "@/lib/dateFormat";
import { PublicTask } from "@/types/PublicTask";
import { styled } from "@mui/material/styles";
import {
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    Divider,
    Button,
    Chip,
} from "@mui/material";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import useNotification from "@/hooks/useNotification";
import { useForm } from "react-hook-form";
import Loading from "@/components/parts/Loading";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

type Form = {
    year: string;
    month: string;
    day: string;
};

const DetailPublicTaskPage: React.FC = () => {
    const params = useParams();
    const { error } = useNotification();
    const [applicantUsers, setApplicantUsers] = useState<ApplicantUsers[]>([]);

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
            color: "",
        },
    });

    const [loading, setLoading] = useState(true);

    const getPublicTask = async () => {
        await axiosApi
            .get(`/api/admin/public_task/${params.id}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTask(response.data.public_task);
                setApplicantUsers(response.data.applicant_users);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTask;
    };

    useEffect(() => {
        getPublicTask();
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }

    return (
        <Box
            sx={{
                maxWidth: "90%",
                p: 2,
                m: "auto",
                overflowY: "scroll",
                height: "35rem",
            }}
        >
            <Card>
                <CardContent>
                    <Grid
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        item
                    >
                        <Box
                            color="text.secondary"
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            作業日時
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            {format(new Date(publicTask.date), "yyyy年M月d日")}
                        </Box>
                    </Grid>
                    <Divider />
                    <Grid
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        item
                    >
                        <Box
                            color="text.secondary"
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            作業時間
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            {publicTask.start_time}~{publicTask.end_time}
                        </Box>
                    </Grid>
                    <Divider />
                    <Grid
                        sx={{
                            p: 2,

                            display: "flex",
                            justifyContent: "center",
                        }}
                        item
                    >
                        <Box
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            <Chip
                                size="small"
                                sx={{ p: 2 }}
                                label={publicTask.section.section_name}
                                color={publicTask.section.color}
                            />
                        </Box>
                        <Box
                            sx={{
                                lineHeight: "32px",
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            {publicTask.task.task_name}
                        </Box>
                    </Grid>
                    <Divider />
                    <Box
                        color="text.secondary"
                        sx={{
                            textAlign: "center",
                            mt: 2,
                        }}
                    >
                        タスク詳細
                    </Box>
                    <Grid
                        sx={{
                            px: 2,
                            pb: 2,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        item
                    >
                        <Box
                            sx={{
                                width: "100%",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                            }}
                        >
                            {publicTask.description}
                        </Box>
                    </Grid>
                    <Divider />
                    <Grid
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        item
                    >
                        <Box
                            color="text.secondary"
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            必要人数
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                fontSize: 24,
                                textAlign: "center",
                            }}
                        >
                            {publicTask.required_personnel}
                        </Box>
                    </Grid>
                    <Divider />
                    <Grid
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        item
                    >
                        <Box
                            color="text.secondary"
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            確定人数
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                fontSize: 24,
                                textAlign: "center",
                            }}
                        >
                            {publicTask.determined_personnel}
                        </Box>
                    </Grid>
                    <Divider />
                    <Grid
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        item
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                display: "block",
                            }}
                        >
                            希望を出す
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
export default DetailPublicTaskPage;
