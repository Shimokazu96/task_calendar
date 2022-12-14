import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { PublicTask } from "@/types/PublicTask";
import { ApplicantUsers } from "@/types/User";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Divider,
    Button,
    Chip,
    Alert,
} from "@mui/material";
import { format } from "date-fns";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";
import Header from "@/components/templates/front/Header";

const DetailFixedTaskPage: React.FC = () => {
    const params = useParams();
    const { error } = useNotification();
    const [applicantUsers, setApplicantUsers] = useState<ApplicantUsers[]>([]);

    const [publicTask, setPublicTask] = useState<PublicTask>({
        id: 0,
        task_id: 0,
        section_id: 0,
        required_personnel: 0,
        determined_personnel: 0,
        applied_public_task: false,
        task_completion_notification: false,
        fixed_applied_public_task: false,
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
        applicant_users: {
            id: 0,
            name: "",
            email: "",
            created_at: "",
            updated_at: "",
            pivot: {
                fixed: false,
                task_completion_notification: false,
            },
            length: 0,
        },
    });

    const [loading, setLoading] = useState(true);

    const getPublicTask = async () => {
        await axiosApi
            .get(`/api/public_task/${params.id}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTask(response.data.public_task);
                setApplicantUsers(response.data.applicantUsers);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTask;
    };

    const completePublicTask = () => {
        axiosApi
            .post(`/api/public_task/complete/${params.id}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                if (response.data == "past_tasks") {
                    error("????????????????????????????????????????????????????????????");
                }
                getPublicTask();
            })
            .catch((err: AxiosError) => console.log(err.response));
        return applicantUsers;
    };
    const cancelPublicTask = () => {
        axiosApi
            .post(`/api/public_task/cancel/${params.id}`)
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
                width: "100%",
                maxWidth: "100%",
                p: 2,
                m: "auto",
                mt: { xs: "12%", md: "64px" },
                mb: { xs: "50px" },
                // mb: "50px",
                // overflowY: "scroll",
            }}
        >
            <Header title={"???????????????????????????"} link={"/mypage/fixed_task"} />
            <Card>
                <CardContent>
                    {publicTask.task_completion_notification == true ? (
                        <Alert severity="success">???????????? </Alert>
                    ) : (
                        <></>
                    )}
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
                            ID
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            {publicTask.id}
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
                            ????????????
                        </Box>
                        <Box
                            sx={{
                                width: "120px",
                                textAlign: "center",
                            }}
                        >
                            {format(new Date(publicTask.date), "yyyy???M???d???")}
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
                            ????????????
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
                        ???????????????
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
                            ????????????
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
                            ????????????
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
                    <Grid
                        sx={{
                            pb: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        item
                    >
                        {applicantUsers.map((user, index) =>
                            user.pivot.fixed == true ? (
                                <Box
                                    color="text.secondary"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <Chip
                                        size="small"
                                        sx={{ p: 0.5 }}
                                        label={user.name}
                                        color="default"
                                    />
                                </Box>
                            ) : (
                                ""
                            )
                        )}
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
                        {publicTask.task_completion_notification == true ? (
                            <Button
                                size="small"
                                color="inherit"
                                variant="contained"
                            >
                                ????????????
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                sx={{
                                    display: "block",
                                }}
                                onClick={() => completePublicTask()}
                            >
                                ?????????????????????
                            </Button>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
export default DetailFixedTaskPage;
