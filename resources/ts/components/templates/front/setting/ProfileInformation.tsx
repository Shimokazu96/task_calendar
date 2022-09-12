import * as React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserState } from "@/atoms/userAtom";
import { User, ProfileInformationForm } from "@/types/User";
import useNotification from "@/hooks/useNotification";

export default function ProfileInformation({ user }: { user: User }) {
    const navigate = useNavigate();
    const { updated, success, error } = useNotification();
    const { setUser } = useUserState();
    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileInformationForm>();

    const onSubmit = async (data: ProfileInformationForm) => {
        await axiosApi
            .put(`/api/user/profile-information`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setUser(response.data.user);
                if (response.data.message == "updated") {
                    updated();
                }
                if (response.data.message == "sendEmail") {
                    navigate("/email/verify");
                    success("認証メールを送信しました。");
                }
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
            <Grid container sx={{ p: { xs: 2, md: 3 } }}>
                <Grid item xs={12} md={12}>
                    <Typography
                        sx={{ fontWeight: "bold" }}
                        component="h3"
                        variant="subtitle1"
                    >
                        アカウント編集
                    </Typography>
                    <Typography
                        sx={{ mb: 1 }}
                        component="h3"
                        variant="subtitle2"
                    >
                        ※メールアドレスを変更すると認証メールが送付されます。
                    </Typography>
                    <TextField
                        {...register("name", {
                            required: "必須入力です。",
                        })}
                        error={"name" in errors}
                        sx={{ mb: 1 }}
                        helperText={errors.name?.message}
                        defaultValue={user.name}
                        required
                        id="name"
                        label="名前"
                        fullWidth
                        variant="standard"
                    ></TextField>
                    <TextField
                        {...register("email", {
                            required: "必須入力です。",
                        })}
                        error={"email" in errors}
                        helperText={errors.email?.message}
                        defaultValue={user.email}
                        multiline
                        required
                        id="email"
                        label="メールアドレス"
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
        </React.Fragment>
    );
}
