import * as React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { User, ProfileInformationForm } from "@/types/User";
import useNotification from "@/hooks/useNotification";

export default function ProfileInformation({ user }: { user: User }) {
    const params = useParams();
    const navigate = useNavigate();
    const { updated, error } = useNotification();
    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileInformationForm>();

    const onSubmit = async (data: ProfileInformationForm) => {
        await axiosApi
            .put(`/api/admin/user/${params.id}/profile-information`, data)
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
                            アカウント編集
                        </Typography>
                        <Typography
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
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
