import * as React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { PasswordUpdateForm } from "@/types/User";
import useNotification from "@/hooks/useNotification";

export default function UserProfileInformation() {
    const params = useParams();
    const navigate = useNavigate();
    const { updated, error } = useNotification();
    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordUpdateForm>();

    const onSubmit = async (data: PasswordUpdateForm) => {
        await axiosApi
            .put(`/api/admin/user/${params.id}/password`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                updated();
                navigate(`/admin/user/${params.id}`);
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
        <React.Fragment>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography
                            sx={{ fontWeight: "bold" }}
                            component="h3"
                            variant="subtitle1"
                        >
                            パスワード編集
                        </Typography>
                        <TextField
                            {...register("current_password", {
                                required: "必須入力です。",
                            })}
                            error={"current_password" in errors}
                            sx={{ mb: 2 }}
                            helperText={errors.current_password?.message}
                            required
                            id="current_password"
                            label="現在のパスワード"
                            fullWidth
                            variant="standard"
                        ></TextField>
                        <TextField
                            {...register("password", {
                                required: "必須入力です。",
                            })}
                            error={"password" in errors}
                            sx={{ mb: 2 }}
                            helperText={errors.password?.message}
                            required
                            id="password"
                            label="新しいパスワード"
                            fullWidth
                            variant="standard"
                            type="password"
                        ></TextField>
                        <TextField
                            {...register("password_confirmation", {
                                required: "必須入力です。",
                            })}
                            error={"password_confirmation" in errors}
                            helperText={errors.password_confirmation?.message}
                            required
                            id="password_confirmation"
                            label="新しいパスワード（確認用）"
                            fullWidth
                            variant="standard"
                            type="password"
                        ></TextField>
                    </Grid>

                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        alignItems="center"
                        style={{ padding: 16 }}
                    >
                        <Grid>
                            <Link to="/admin/user">
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
        </React.Fragment>
    );
}
