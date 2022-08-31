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
import { Link as RouterLink } from "react-router-dom";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import useNotification from "@/hooks/useNotification";

const theme = createTheme();
// POSTデータの型
type ForgotPasswordForm = {
    email: string;
};
const ForgotPassword = () => {
    const { error, success } = useNotification();

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>();

    const onSubmit = async (data: ForgotPasswordForm) => {
        await axiosApi
            .post("/api/forgot-password", data)
            .then((response: AxiosResponse) => {
                console.log(response.data.message);
                success(response.data.message);
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
                        ご登録されているメールアドレスへパスワードリセットの案内を送付します。
                        <br />
                        メールアドレスをご入力の上、「パスワードリセット」をクリックしてください。
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
