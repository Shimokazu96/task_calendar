import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogContent,
    TextField,
    Grid,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import { Task, Validation, Form } from "@/types/Task";
import useNotification from "@/hooks/useNotification";
// import Loading from "@/components/parts/Loading";

type Props = {
    open: boolean;
    close: VoidFunction;
};

export default function CreateTaskDialog(props: Props) {
    const navigate = useNavigate();
    const params = useParams();
    const [tasks, setTasks] = useState([]);
    const [sections, setSections] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [rendering, setRendering] = useState(false);
    const { saved, error } = useNotification();

    const [task, setTask] = useState<Task>({
        id: 0,
        task_name: "",
        description: "",
        created_at: "",
        updated_at: "",
    });

    useEffect(() => {
        if (props.open) {
            return setRendering(true);
        }
        if (!props.open) {
            return setRendering(false);
        }
        return setRendering(false);
    }, [props.open]);
    // React-Hook-Form
    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Form>();

    const dialogClose = async () => {
        setValue("task_name", "");
        setValue("description", "");
        props.close();
    };

    const onSubmit = async (data: Form) => {
        await axiosApi
            .post(`/api/admin/task`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                saved();
                navigate(`/admin/public_task/create`);
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
        reset();
    };
    if (!rendering) {
        return <></>;
    }
    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={props.open}
                keepMounted
                onClose={() => dialogClose()}
                aria-labelledby="common-dialog-title"
                aria-describedby="common-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={3}>
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
                                <Button onClick={() => dialogClose()}>
                                    キャンセル
                                </Button>

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
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
