import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import {
    setYear,
    setMonth,
    setDay,
    searchDate,
} from "@/lib/dateFormat";
import { PublicTask } from "@/types/PublicTask";
import { styled } from "@mui/material/styles";
import {
    Box,
    Paper,
    Grid,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    LinearProgress,
    Chip,
    Alert,
} from "@mui/material";
import { format, parse } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import useNotification from "@/hooks/useNotification";
import { useForm } from "react-hook-form";
import Loading from "@/components/parts/Loading";
import Header from "@/components/templates/front/Header";

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

const PublicTaskPage: React.FC = () => {
    const [publicTasks, setPublicTasks] = useState<PublicTask[]>([]);
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [linearProgress, setLinearProgress] = useState(false);
    const navigate = useNavigate();
    const thisDate = format(new Date(), "yyyy-MM-dd");
    const thisYear = format(new Date(), "yyyy");
    const thisMonth = format(new Date(), "M");
    const thisDay = format(new Date(), "d");
    const { saved, error } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const onSubmit = async (data: Form) => {
        setLinearProgress(true);
        let date = searchDate(data.year, data.month, data.day);
        if (date == "Invalid Date") {
            setLinearProgress(false);
            return error("無効な日付です。");
        }
        await axiosApi
            .get(`/api/public_task?date=${date}&page=1`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                if (page == 1) {
                    setPublicTasks(response.data.public_tasks.data);
                }
                if (page > 1) {
                    setPublicTasks(response.data.public_tasks.data);
                }
                setPage(response.data.public_tasks.current_page);
                setDate(response.data.date);
                setLoading(false);
                setLinearProgress(false);
            })
            .catch((err) => {
                if (err.response?.status === 422) {
                    const errors = err.response?.data.errors;
                    Object.keys(errors).map((key: string) => {
                        error(errors[key][0]);
                    });
                }
                if (err.response?.status === 500) {
                    error("データの取得に失敗しました。");
                }
            });
    };

    const fetchMoreData = () => {
        getPublicTasks(page + 1, date);
    };
    const getPublicTasks = async (page: number, date: string) => {
        console.log(page);
        console.log(date);

        await axiosApi
            .get(`/api/public_task?date=${date}&page=${page}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                if (page == 1) {
                    setPublicTasks(response.data.public_tasks.data);
                }
                if (page > 1) {
                    setPublicTasks([
                        ...publicTasks,
                        ...response.data.public_tasks.data,
                    ]);
                }
                setPage(response.data.public_tasks.current_page);
                setDate(response.data.date);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response?.status === 422) {
                    const errors = err.response?.data.errors;
                    Object.keys(errors).map((key: string) => {
                        error(errors[key][0]);
                    });
                }
                if (err.response?.status === 500) {
                    error("データの取得に失敗しました。");
                }
            });
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks(page, thisDate);
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header title={"公開タスク"} />
            <Box sx={{ p: 2 }}>
                <Grid
                    container
                    sx={{
                        mt: "12%",
                        width: "100%",
                        height: "12%",
                        flexShrink: 0,
                        p: 1,
                        pt: 3,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: 1000,
                        justifyContent: "space-evenly",
                        backgroundColor: "white",
                    }}
                >
                    <Grid item xs={3} md={4}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                年
                            </InputLabel>
                            <Select
                                {...register("year", {
                                    required: "入力してください。",
                                })}
                                defaultValue={thisYear}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                {setYear().map((value, index) => (
                                    <MenuItem key={index} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2.5} md={2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                月
                            </InputLabel>
                            <Select
                                {...register("month")}
                                defaultValue={thisMonth}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                {setMonth().map((value, index) => (
                                    <MenuItem key={index} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2.5} md={2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                日
                            </InputLabel>
                            <Select
                                {...register("day")}
                                defaultValue={thisDay}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={""}>　</MenuItem>
                                {setDay().map((value, index) => (
                                    <MenuItem key={index} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            variant="contained"
                            size="small"
                            sx={{
                                minWidth: 0,
                                display: "block",
                                height: "80%",
                            }}
                        >
                            検索
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        mt: "30%",
                        flexGrow: 1,
                        overflowY: "scroll",
                        minHeight: "33rem",
                        mb: "50px",
                    }}
                >
                    {linearProgress ? <LinearProgress /> : <></>}
                    {publicTasks.length ? (
                        <InfiniteScroll
                            dataLength={publicTasks.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={<></>}
                        >
                            {publicTasks.map((publicTask, index) => (
                                <Link
                                    key={index}
                                    to={"/public_task/" + publicTasks[index].id}
                                >
                                    <StyledPaper
                                        sx={{
                                            my: 1,
                                            mx: "auto",
                                            p: 2,
                                        }}
                                    >
                                        {publicTasks[index]
                                            .applied_public_task ? (
                                            <Alert
                                                sx={{
                                                    mb: 0.5,
                                                    p: 0.5,
                                                }}
                                                severity="success"
                                            >
                                                申請済み
                                            </Alert>
                                        ) : (
                                            <></>
                                        )}

                                        <Grid
                                            sx={{
                                                width: "auto",
                                                minWidth: 0,
                                                flexFlow: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            container
                                            wrap="nowrap"
                                            spacing={2}
                                        >
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                item
                                            >
                                                <Box
                                                    sx={{
                                                        width: "120px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {format(
                                                        new Date(
                                                            publicTask.date
                                                        ),
                                                        "yyyy年M月d日"
                                                    )}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: "120px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {publicTask.start_time}~
                                                    {publicTask.end_time}
                                                </Box>
                                            </Grid>
                                            <Grid
                                                sx={{
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
                                                        sx={{ p: 1 }}
                                                        label={
                                                            publicTask.section
                                                                .section_name
                                                        }
                                                        color={
                                                            publicTask.section
                                                                .color
                                                        }
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        lineHeight: "24px",
                                                        width: "120px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {publicTask.task.task_name}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </StyledPaper>
                                </Link>
                            ))}
                        </InfiniteScroll>
                    ) : (
                        <Box
                            sx={{
                                mt: 2,
                                textAlign: "center",
                            }}
                        >
                            公開されてるタスクはありません。
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default PublicTaskPage;
