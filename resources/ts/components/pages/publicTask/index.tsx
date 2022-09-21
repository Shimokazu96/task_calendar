import React from "react";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { searchDate } from "@/lib/dateFormat";
import { PublicTask } from "@/types/PublicTask";
import { Box, LinearProgress } from "@mui/material";
import { format } from "date-fns";
import useNotification from "@/hooks/useNotification";
import { useForm } from "react-hook-form";
import Loading from "@/components/parts/Loading";
import Header from "@/components/templates/front/Header";
import useWindowSize, {
    InfiniteScrollDifferenceHeight,
} from "@/hooks/useWindowSize";
import DateSearchForm from "@/components/templates/front/DateSearchForm";
import InfiniteScroll from "@/components/templates/front/InfiniteScroll";

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
    const thisDate = format(new Date(), "yyyy-MM-dd");
    const thisYear = format(new Date(), "yyyy");
    const thisMonth = format(new Date(), "M");
    const thisDay = format(new Date(), "d");
    const { saved, error } = useNotification();
    const [width, height] = useWindowSize();
    const InfiniteScrollHeight = height - InfiniteScrollDifferenceHeight;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const onSubmit = async (data: Form) => {
        setLinearProgress(true);
        let date = searchDate(data.year, data.month, data.day);
        if (date == "Invalid_Date") {
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
            <Header title={"公開タスク"} link={""} />
            <Box sx={{ p: 2 }}>
                <DateSearchForm
                    onSubmit={handleSubmit(onSubmit)}
                    year={{
                        ...register("year", {
                            required: "入力してください。",
                        }),
                    }}
                    month={{ ...register("month") }}
                    day={{ ...register("day") }}
                    defaultYear={thisYear}
                    defaultMonth={thisMonth}
                    defaultDay={thisDay}
                />
                <Box
                    sx={{
                        mt: { xs: "95px", md: "150px" },
                        flexGrow: 1,
                        overflowY: "scroll",
                        mb: "60px",
                        // height: { md: InfiniteScrollHeight },
                    }}
                >
                    {linearProgress ? <LinearProgress /> : <></>}
                    {publicTasks.length ? (
                        <InfiniteScroll
                            publicTasks={publicTasks}
                            fetchMoreData={fetchMoreData}
                            alertMessage={"申請済み"}
                            link="/public_task/"
                        />
                    ) : (
                        <Box
                            sx={{
                                mt: { xs: "95px", md: "150px" },
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
