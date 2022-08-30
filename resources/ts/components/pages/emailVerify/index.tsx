import {
    Button,
    CssBaseline,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import useNotification from "@/hooks/useNotification";

const theme = createTheme();

const EmailVerify = () => {
    const { error, success } = useNotification();

    const onSubmit = async () => {
        await axiosApi
            .post("/api/email/verification-notification")
            .then((response: AxiosResponse) => {
                console.log(response);
                success("メールを再送しました。");
            })
            .catch((err) => {
                console.log(err);
                error("メールの送信に失敗しました。");
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
                        メールアドレス認証
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
                        ログインするにはメールアドレス認証が必要です。
                        <br />
                        メールを確認して、登録手続きを完了してください。
                    </Typography>
                    <Button
                        onClick={() => onSubmit()}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        メールを再送する
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default EmailVerify;
