import {
    Button,
    CssBaseline,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    TextField,
    Link,
    Grid,
} from "@mui/material";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import useNotification from "@/hooks/useNotification";

const theme = createTheme();
// POSTデータの型
type ResetPassword = {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
};
const ForgotPassword = () => {
    const navigate = useNavigate();
    const { error, success } = useNotification();
    const params = useParams();
    console.log(params);
    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPassword>();

    const onSubmit = async (data: ResetPassword) => {
        data = Object.assign(data, params);
        await axiosApi
            .post("/api/reset-password", data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                success(response.data.message);
                navigate("/login");
            })
            .catch((err) => {
                if (err.response?.status === 422) {
                    const errors = err.response?.data.errors;
                    Object.keys(errors).map((key: string) => {
                        error(errors[key][0]);
                    });
                }
                if (err.response?.status === 500) {
                    error("メールの送信に失敗しました。");
                }
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
                    <Typography component="h1" variant="h5">
                        パスワードリセット
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        component="p"
                        variant="subtitle2"
                    >
                        新しいパスワードを入力してください。
                    </Typography>
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
                        sx={{ mb: 2 }}
                        helperText={errors.password?.message}
                        required
                        id="password"
                        label="新しいパスワード"
                        fullWidth
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
                        type="password"
                    ></TextField>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        パスワードリセット
                    </Button>
                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Link
                            component={RouterLink}
                            to="/login"
                            variant="body2"
                        >
                            ログインに戻る
                        </Link>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default ForgotPassword;
