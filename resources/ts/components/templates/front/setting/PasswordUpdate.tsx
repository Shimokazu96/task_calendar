import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link } from "react-router-dom";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { PasswordUpdateForm } from "@/types/User";
import useNotification from "@/hooks/useNotification";
import { useUserState } from "@/atoms/userAtom";
import PasswordUpdateDialog from "@/components/templates/front/PasswordUpdateDialog";

export default function UserProfileInformation() {
    const { user, setUser } = useUserState();
    const [dialogOpen, setDialogOpen] = useState(false);

    // React-Hook-Form
    const {
        register,
        trigger,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm<PasswordUpdateForm>({
        mode: "onChange",
        criteriaMode: "all",
    });

    const handleDialogOpen = () => {
        trigger();
        function isEmpty(obj: object) {
            return !Object.keys(obj).length;
        }
        if (!isEmpty(errors)) {
            return setDialogOpen(false);
        }
        if (isDirty) {
            return setDialogOpen(true);
        }
        setDialogOpen(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const { updated, error } = useNotification();

    const onSubmit = async (data: PasswordUpdateForm) => {
        await axiosApi
            .put(`/api/user/password`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setUser(null);
                updated();
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
            <Grid
                container
                sx={{
                    p: { xs: 2, md: 3 },
                }}
            >
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
                        sx={{ mb: 1 }}
                        helperText={errors.current_password?.message}
                        required
                        id="current_password"
                        label="現在のパスワード"
                        fullWidth
                        variant="standard"
                        type="password"
                    ></TextField>
                    <TextField
                        {...register("password", {
                            required: "必須入力です。",
                            pattern: {
                                value: /^([a-zA-Z0-9]{8,})$/,
                                message:
                                    "8文字以上の半角英数字で入力してください",
                            },
                        })}
                        error={"password" in errors}
                        sx={{ mb: 1 }}
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
                            pattern: {
                                value: /^([a-zA-Z0-9]{8,})$/,
                                message:
                                    "8文字以上の半角英数字で入力してください",
                            },
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
                        <Button
                            onClick={() => handleDialogOpen()}
                            variant="contained"
                            color="primary"
                            type="button"
                            sx={{ ml: 1 }}
                        >
                            更新
                        </Button>
                    </Grid>
                    <PasswordUpdateDialog
                        open={dialogOpen}
                        close={() => handleDialogClose()}
                        onSubmit={handleSubmit(onSubmit)}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
