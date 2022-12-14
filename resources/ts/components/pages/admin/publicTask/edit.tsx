import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { useParams } from "react-router-dom";
import useNotification from "@/hooks/useNotification";
import { PublicTask } from "@/types/PublicTask";
import { ApplicantUsers } from "@/types/User";
import { Box, Typography, Chip, Button } from "@mui/material";
import PublicTaskCard from "@/components/templates/admin/public_task/PublicTaskCard";
import MUIDataTable from "mui-datatables";
import Loading from "@/components/parts/Loading";

const options = {
    filter: false as any,
    sort: false,
    print: false as any,
    viewColumns: false as any,
    download: false as any,
    selectableRows: "none" as any,
};
const EditPublicTaskPage: React.FC = () => {
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
            .get(`/api/admin/public_task/${params.id}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPublicTask(response.data.public_task);
                setApplicantUsers(response.data.applicantUsers);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTask;
    };

    useEffect(() => {
        getPublicTask();
    }, []);
    const columns = [
        {
            name: "name",
            label: "??????",
            options: { filter: true },
        },
        {
            name: "status",
            label: "???????????????",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {applicantUsers[dataIndex].pivot.fixed ? (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="??????"
                                    color="primary"
                                />
                            ) : (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="?????????"
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
                                if (response.data == "past_tasks") {
                                    error("????????????????????????????????????????????????????????????");
                                }
                                if (response.data == "over_capacity") {
                                    error("??????????????????????????????????????????");
                                }
                                if (response.data == "over_hours") {
                                    error("8??????????????????????????????");
                                }

                                getPublicTask();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return applicantUsers;
                    };
                    const cancelPublicTask = (id: number) => {
                        axiosApi
                            .post(
                                `/api/admin/public_task/${params.id}/cancel/${id}`
                            )
                            .then((response: AxiosResponse) => {
                                console.log(response.data);
                                if (response.data == "past_tasks") {
                                    error("????????????????????????????????????????????????????????????");
                                }
                                if (response.data == "already_reported") {
                                    error("????????????????????????????????????");
                                }
                                getPublicTask();
                            })
                            .catch((err: AxiosError) =>
                                console.log(err.response)
                            );
                        return applicantUsers;
                    };

                    return (
                        <>
                            {applicantUsers[dataIndex].pivot.fixed ? (
                                <Button
                                    color="inherit"
                                    variant="contained"
                                    onClick={() =>
                                        cancelPublicTask(
                                            applicantUsers[dataIndex].id
                                        )
                                    }
                                >
                                    ????????????
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() =>
                                        fixPublicTask(
                                            applicantUsers[dataIndex].id
                                        )
                                    }
                                >
                                    ????????????
                                </Button>
                            )}
                        </>
                    );
                },
            },
        },
        {
            name: "?????????????????????",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            {applicantUsers[dataIndex].pivot
                                .task_completion_notification ? (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="????????????"
                                    color="success"
                                />
                            ) : (
                                <Chip
                                    sx={{ p: 1 }}
                                    label="?????????"
                                    color="default"
                                />
                            )}
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
                        ?????????????????????
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mb: 4 }}>
                <PublicTaskCard publicTask={publicTask} />
            </Box>
            <MUIDataTable
                title={"????????????????????????"}
                data={applicantUsers}
                columns={columns}
                options={options}
            />
        </>
    );
};
export default EditPublicTaskPage;
