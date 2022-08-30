import * as React from "react";
import { useEffect, useState } from "react";
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
import { User, RegisterForm } from "@/types/User";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/parts/Loading";

const CreateUserPage: React.FC = () => {
    const navigate = useNavigate();
    const { updated, error } = useNotification();

    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        password: "",
        password_confirmation: "",
        created_at: "",
        updated_at: "",
    });

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    console.log(user);

    const onSubmit = async (data: RegisterForm) => {
        await axiosApi
            .post(`/api/admin/user`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                updated();
                navigate(`/admin/user`);
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
                        スタッフ登録
                    </Typography>
                </Box>
            </Box>
            <Container component="main" maxWidth={false} sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
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
                                sx={{ mb: 2 }}
                                helperText={errors.email?.message}
                                defaultValue={user.email}
                                required
                                id="email"
                                label="メールアドレス"
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
                                defaultValue={user.password}
                                required
                                id="password"
                                label="パスワード"
                                fullWidth
                                variant="standard"
                                type="password"
                            ></TextField>
                            <TextField
                                {...register("password_confirmation", {
                                    required: "必須入力です。",
                                })}
                                error={"password_confirmation" in errors}
                                helperText={
                                    errors.password_confirmation?.message
                                }
                                defaultValue={user.password_confirmation}
                                required
                                id="password"
                                label="パスワード確認"
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
            </Container>
        </>
    );
};
export default CreateUserPage;
