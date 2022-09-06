import React from "react";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { setYear, setMonth, setDay } from "@/lib/dateFormat";
import { PublicTask } from "@/types/PublicTask";
import { ApplicantUsers } from "@/types/User";
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
    Alert,
    AlertTitle,
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
    // const params = useParams();
    const { error } = useNotification();
    const [applicantUsers, setApplicantUsers] = useState<ApplicantUsers[]>([]);

    const [publicTask, setPublicTask] = useState<PublicTask>({
        id: 0,
        task_id: 0,
        section_id: 0,
        required_personnel: 0,
        determined_personnel: 0,
        applied_public_task: false,
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
            .get(`/api/public_task/1`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTask(response.data.public_task);
                setApplicantUsers(response.data.applicant_users);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTask;
    };

    const applyPublicTask = () => {
        axiosApi
            .post(`/api/public_task/apply/1`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                getPublicTask();
            })
            .catch((err: AxiosError) => console.log(err.response));
        return applicantUsers;
    };
    const cancelPublicTask = () => {
        axiosApi
            .post(`/api/public_task/cancel/1`)
            .then((response: AxiosResponse) => {
                console.log(response.data);

                getPublicTask();
            })
            .catch((err: AxiosError) => console.log(err.response));
        return applicantUsers;
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
                maxWidth: "100%",
                p: 2,
                m: "auto",
                overflowY: "scroll",
                height: "35rem",
            }}
        >
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
                {publicTask.applied_public_task ? (
                    <Button
                        size="small"
                        color="inherit"
                        variant="contained"
                        onClick={() => cancelPublicTask()}
                    >
                        キャンセルする
                    </Button>
                ) : (
                    <Button
                        size="small"
                        fullWidth
                        variant="contained"
                        sx={{
                            display: "block",
                        }}
                        onClick={() => applyPublicTask()}
                    >
                        希望を出す
                    </Button>
                )}
            </Grid>
        </Box>
    );
};
export default DetailPublicTaskPage;
