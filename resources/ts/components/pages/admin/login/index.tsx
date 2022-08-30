import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
    createTheme,
    ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useAdminState } from "@/atoms/adminAtom";

// POSTデータの型
type LoginForm = {
    email: string;
    password: string;
};

// バリデーションメッセージの型
type Validation = {
    email?: string;
    password?: string;
    loginFailed?: string;
};

const theme = createTheme();

const Login = () => {
    const navigate = useNavigate();

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    // state定義
    const [validation, setValidation] = useState<Validation>({});

    const { setAdmin } = useAdminState();

    const onSubmit = async (data: LoginForm) => {
        setValidation({});
        await axiosApi
            // CSRF保護の初期化
            .get("/sanctum/csrf-cookie")
            .then((response: AxiosResponse) => {
                // ログイン処理
                axiosApi
                    .post("/api/admin/login", data)
                    .then((response: AxiosResponse) => {
                        console.log(response.data);
                        setAdmin(response.data);
                        navigate("/admin");
                    })
                    .catch((err: any) => {
                        console.log(err.response);
                        // バリデーションエラー
                        if (err.response?.status === 422) {
                            const errors = err.response?.data.errors;
                            // state更新用のオブジェクトを別で定義
                            const validationMessages: {
                                [index: string]: string;
                            } = {} as Validation;
                            Object.keys(errors).map((key: string) => {
                                validationMessages[key] = errors[key][0];
                            });
                            // state更新用オブジェクトに更新
                            setValidation(validationMessages);
                        }
                        if (err.response?.status === 500) {
                            alert("システムエラーです！！");
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
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
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
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Typography
                            sx={{ color: "error.main" }}
                            component="div"
                            variant="body1"
                        >
                            {validation.email}
                        </Typography>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Login;
