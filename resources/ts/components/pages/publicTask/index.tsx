import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useResolvedPath } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { PublicTask } from "@/types/PublicTask";
import { styled } from "@mui/material/styles";
import {
    Box,
    Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const PublicTaskPage: React.FC = () => {
    const [publicTasks, setPublicTasks] = useState<PublicTask[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const { deleted } = useNotification();
    // const [items, updateItems] = useState(Array.from({ length: 40 }));

    const fetchMoreData = () => {
        getPublicTasks(page + 1);
    };
    console.log(page);
    const getPublicTasks = async (page: number) => {
        console.log(page);
        await axiosApi
            .get(`/api/public_task?page=${page}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                if (page == 1) {
                    setPublicTasks(response.data.data);
                }
                if (page > 1) {
                    setPublicTasks([...publicTasks, ...response.data.data]);
                }
                setPage(response.data.current_page);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return publicTasks;
    };

    useEffect(() => {
        getPublicTasks(page);
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
            <InfiniteScroll
                dataLength={publicTasks.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<></>}
                // pullDownToRefresh={true}
                // pullDownToRefreshContent={<>Pulling</>}
                // refreshFunction={() => {
                //     setTimeout(() => {
                //         setPublicTasks(Array.from({ length: 40 }));
                //     }, 1500);
                // }}
            >
                {publicTasks.map((publicTask, index) => (
                    <StyledPaper
                        key={index}
                        sx={{
                            my: 1,
                            mx: "auto",
                            p: 2,
                        }}
                    >
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
                            <Grid item>
                                {publicTask.date} {publicTask.start_time}~
                                {publicTask.end_time}
                            </Grid>
                            <Grid item>
                                {publicTask.section.section_name}
                                {publicTask.task.task_name}
                            </Grid>
                        </Grid>
                    </StyledPaper>
                ))}
            </InfiniteScroll>
        </Box>
    );
};
export default PublicTaskPage;
