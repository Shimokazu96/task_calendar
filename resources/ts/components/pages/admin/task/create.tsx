import * as React from "react";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Paper,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Task, Form } from "@/types/Task";
import useNotification from "@/hooks/useNotification";

const CreateTaskPage: React.FC = () => {
    const navigate = useNavigate();
    const { saved, error } = useNotification();

    const [task, setTask] = useState<Task>({
        id: 0,
        task_name: "",
        display_flag: false,
        description: "",
        created_at: "",
        updated_at: "",
    });

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const onSubmit = async (data: Form) => {
        await axiosApi
            .post(`/api/admin/task`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                saved();
                navigate(`/admin/task`);
            })
            .catch((err: any) => {
                console.log(err.response);
                // バリデーションエラー
                if (err.response?.status === 422) {
                    const errors = err.response?.data.errors;
                    Object.keys(errors).map((key: string) => {
                        error(errors[key][0]);
                    });
                }
                if (err.response?.status === 500) {
                    error("システムエラーです！");
                }
            });
    };

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
                        タスク・マスター登録
                    </Typography>
                </Box>
            </Box>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <FormControlLabel
                            sx={{ ml: 0 }}
                            control={
                                <Switch
                                    {...register("display_flag")}
                                    defaultChecked={task.display_flag}
                                    color="primary"
                                />
                            }
                            label="表示・非表示"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            {...register("task_name", {
                                required: "必須入力です。",
                            })}
                            error={"task_name" in errors}
                            sx={{ mb: 2 }}
                            helperText={errors.task_name?.message}
                            defaultValue={task.task_name}
                            required
                            id="task_name"
                            label="タスク名"
                            fullWidth
                            variant="standard"
                        ></TextField>
                        <TextField
                            {...register("description", {
                                required: "必須入力です。",
                            })}
                            error={"description" in errors}
                            helperText={errors.description?.message}
                            defaultValue={task.description}
                            multiline
                            rows={4}
                            required
                            id="description"
                            label="タスク概要"
                            fullWidth
                            variant="standard"
                        ></TextField>
                    </Grid>

                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        alignItems="center"
                        style={{ padding: 16 }}
                    >
                        <Grid>
                            <Link to="/admin/task">
                                <Button>キャンセル</Button>
                            </Link>

                            <Button
                                onClick={handleSubmit(onSubmit)}
                                variant="contained"
                                color="primary"
                                type="button"
                                sx={{ ml: 1 }}
                            >
                                更新
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};
export default CreateTaskPage;
