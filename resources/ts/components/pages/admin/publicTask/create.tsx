import * as React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Paper,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { Form } from "@/types/PublicTask";
import { format } from "date-fns";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";
import CustomDatePicker from "@/components/parts/CustomDatePicker";
import CustomTimePicker from "@/components/parts/CustomTimePicker";

type Task = {
    id: number;
    task_name: string;
};
type Section = {
    id: number;
    section_name: string;
};

const CreatePublicTaskPage: React.FC = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const { saved, error } = useNotification();
    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);
    const [sections, setSections] = useState([]);

    // React-Hook-Form
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const getTask = async () => {
        await axiosApi
            .get(`/api/admin/task_name`)
            .then((response: AxiosResponse) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return tasks;
    };
    const getSection = async () => {
        await axiosApi
            .get(`/api/admin/section_name`)
            .then((response: AxiosResponse) => {
                setSections(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return sections;
    };

    useEffect(() => {
        getTask();
        getSection();
    }, []);

    const onSubmit = async (data: Form) => {
        let formData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        formData.append("task_id", data.task_id);
        formData.append("section_id", data.section_id);
        formData.append("required_personnel", data.required_personnel);
        data.description
            ? formData.append("description", data.description)
            : formData.append("description", "");
        formData.append("date", format(Number(data.date), "yyyy-MM-dd"));
        formData.append("start_time", format(Number(data.start_time), "HH:mm"));
        formData.append("end_time", format(Number(data.end_time), "HH:mm"));
        for (let value of formData.entries()) {
            console.log(value);
        }
        await axiosApi
            .post(`/api/admin/public_task`, formData, config)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                saved();
                navigate(`/admin/public_task`);
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
                        公開タスク登録
                    </Typography>
                </Box>
            </Box>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grid
                            container
                            sx={{
                                display: "flex",
                                mb: 2,
                            }}
                            alignItems="center"
                        >
                            <CustomDatePicker
                                defaultValue={query.get("date") || ""}
                                valueName="date"
                                control={control}
                                required
                                mr={2}
                                label="日付"
                            />
                            <CustomTimePicker
                                defaultValue={""}
                                valueName="start_time"
                                control={control}
                                required
                                mr={2}
                                label="開始時間"
                            />
                            <CustomTimePicker
                                defaultValue={""}
                                valueName="end_time"
                                control={control}
                                required
                                mr={2}
                                label="終了時間"
                            />
                        </Grid>

                        <FormControl
                            variant="standard"
                            sx={{ mb: 2, mr: 2, minWidth: 300 }}
                        >
                            <InputLabel
                                sx={
                                    errors.task_id?.message
                                        ? { color: "error.main" }
                                        : { color: "text.secondary" }
                                }
                                id="task_id"
                                required
                            >
                                タスク選択
                            </InputLabel>
                            <Select
                                defaultValue=""
                                {...register("task_id", {
                                    required: "必須入力です。",
                                })}
                                error={"task_id" in errors}
                                labelId="task_id"
                                id="task_id"
                                label="task_id"
                            >
                                {tasks?.map((task: Task, index: number) => (
                                    <MenuItem key={index} value={task.id}>
                                        {task.task_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText sx={{ color: "error.main" }}>
                                {errors.task_id?.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            variant="standard"
                            sx={{ mb: 2, minWidth: 300 }}
                        >
                            <InputLabel
                                sx={
                                    errors.section_id?.message
                                        ? { color: "error.main" }
                                        : { color: "text.secondary" }
                                }
                                id="section_id"
                                required
                            >
                                セクション選択
                            </InputLabel>
                            <Select
                                defaultValue=""
                                {...register("section_id", {
                                    required: "必須入力です。",
                                })}
                                error={"section_id" in errors}
                                labelId="section_id"
                                id="section_id"
                                label="section_id"
                            >
                                {sections?.map(
                                    (section: Section, index: number) => (
                                        <MenuItem
                                            key={index}
                                            value={section.id}
                                        >
                                            {section.section_name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                            <FormHelperText sx={{ color: "error.main" }}>
                                {errors.section_id?.message}
                            </FormHelperText>
                        </FormControl>
                        <Grid item xs={12} md={12}>
                            <TextField
                                {...register("required_personnel", {
                                    required: "必須入力です。",
                                })}
                                error={"required_personnel" in errors}
                                helperText={errors.required_personnel?.message}
                                required
                                id="required_personnel"
                                label="必要人数"
                                type="number"
                                sx={{ mb: 2 }}
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={12}>
                                <TextField
                                    {...register("determined_personnel", {
                                        required: "必須入力です。",
                                    })}
                                    error={"determined_personnel" in errors}
                                    helperText={
                                        errors.determined_personnel?.message
                                    }
                                    id="determined_personnel"
                                    label="確定人数"
                                    type="number"
                                    sx={{ mb: 2 }}
                                    InputProps={{ inputProps: { min: 1 } }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    required
                                />
                            </Grid> */}
                        <TextField
                            {...register("description")}
                            multiline
                            rows={4}
                            id="description"
                            label="補足"
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
                            <Link to="/admin/public_task">
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
export default CreatePublicTaskPage;
