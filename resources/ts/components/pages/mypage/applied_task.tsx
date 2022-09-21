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

const AppliedTaskPage: React.FC = () => {
    const [publicTasks, setPublicTasks] = useState<PublicTask[]>([]);
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [linearProgress, setLinearProgress] = useState(false);
    const thisYear = format(new Date(), "yyyy");
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
            .get(`/api/user/applied/public_task?date=${searchDate}&page=1`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                console.log(page);
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
        console.log(page);
        getPublicTasks(page + 1, date);
    };
    const getPublicTasks = async (page: number, date: string) => {
        console.log(page);
        console.log(date);

        await axiosApi
            .get(`/api/user/applied/public_task?date=${date}&page=${page}`)
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
        getPublicTasks(page, thisYear);
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header title={"希望を出しているタスク"} link={"/mypage"} />
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
                    defaultMonth={""}
                    defaultDay={""}
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
                            alertMessage={""}
                        />
                    ) : (
                        <Box
                            sx={{
                                mt: 2,
                                textAlign: "center",
                            }}
                        >
                            申請しているタスクはありません。
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default AppliedTaskPage;
