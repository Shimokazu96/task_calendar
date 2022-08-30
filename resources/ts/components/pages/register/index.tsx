import * as React from "react";
import { useState } from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useUserState } from "@/atoms/userAtom";
import { useForm } from "react-hook-form";
import useNotification from "@/hooks/useNotification";

const theme = createTheme();

// POSTデータの型
type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { error } = useNotification();
    const { setUser } = useUserState();

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit = async (data: RegisterForm) => {
        await axiosApi
            // CSRF保護の初期化
            .get("/sanctum/csrf-cookie")
            .then((response: AxiosResponse) => {
                // ログイン処理
                axiosApi
                    .post("api/register", data)
                    .then((response: AxiosResponse) => {
                        console.log(response.data);
                        setUser(response.data);
                        navigate("/email/verify");
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
                            error("システムエラーです！！");
                        }
                    });
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <TextField
                            {...register("name", {
                                required: "必須入力です。",
                            })}
                            error={"name" in errors}
                            helperText={errors.name?.message}
                            required
                            fullWidth
                            id="name"
                            label="名前"
                            name="name"
                        />
                        <TextField
                            {...register("email", {
                                required: "必須入力です。",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message:
                                        "有効なメールアドレスを入力してください。",
                                },
                            })}
                            error={"email" in errors}
                            helperText={errors.email?.message}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            name="email"
                            autoFocus
                        />
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
                            helperText={errors.password?.message}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="パスワード"
                            type="password"
                            id="password"
                        />
                        <TextField
                            {...register("password_confirmation", {
                                required: "必須入力です。",
                            })}
                            error={"password_confirmation" in errors}
                            helperText={errors.password_confirmation?.message}
                            required
                            fullWidth
                            name="password_confirmation"
                            label="パスワード（確認用）"
                            type="password"
                            id="password_confirmation"
                        />
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登録する
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    ログイン画面に戻る
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Register;
