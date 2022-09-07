import { PublicTask } from "@/types/PublicTask";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";

export default function PublicTaskCard({
    publicTask,
}: {
    publicTask: PublicTask;
}) {
    return (
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
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",

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
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",

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
                                minWidth: "80%",
                                m: 0,
                                p: 2,
                            }}
                        >
                            {publicTask.start_time}~{publicTask.end_time}
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
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",

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
                                minWidth: "80%",
                                m: 0,
                                p: 2,
                            }}
                        >
                            {publicTask.section.section_name}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",
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
                                minWidth: "80%",
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
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",
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
                                minWidth: "80%",
                                fontSize: 24,
                                m: 0,
                                p: 1,
                            }}
                        >
                            {publicTask.required_personnel}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={12}
                        lg={6}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            noWrap
                            component="p"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                minWidth: "20%",
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
                                minWidth: "80%",
                                fontSize: 24,
                                m: 0,
                                p: 1,
                            }}
                        >
                            {publicTask.determined_personnel}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
