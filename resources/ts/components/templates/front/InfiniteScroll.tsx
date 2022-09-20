import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Box, Paper, Grid, Chip, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { PublicTask } from "@/types/PublicTask";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

type Props = {
    publicTasks: PublicTask[];
    fetchMoreData: VoidFunction;
    alertMessage: string;
};

export default function DateSearchForm(props: Props) {
    return (
        <InfiniteScroll
            dataLength={props.publicTasks.length}
            next={() => props.fetchMoreData()}
            hasMore={true}
            loader={<></>}
        >
            {props.publicTasks.map((publicTask, index) => (
                <Link
                    key={index}
                    to={"/public_task/" + props.publicTasks[index].id}
                >
                    <StyledPaper
                        sx={{
                            my: 1,
                            mx: "auto",
                            p: 2,
                            maxWidth: { md: "80%" },
                        }}
                    >
                        {props.alertMessage &&
                        props.publicTasks[index].applied_public_task ? (
                            <Alert
                                sx={{
                                    mb: 0.5,
                                    p: 0.5,
                                }}
                                severity="success"
                            >
                                {props.alertMessage}
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
                                        new Date(publicTask.date),
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
                                        label={publicTask.section.section_name}
                                        color={publicTask.section.color}
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
    );
}
