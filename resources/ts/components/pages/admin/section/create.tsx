import * as React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import Dashboard from "@/components/templates/admin/Dashboard";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
    CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Section, Validation } from "@/types/Section";

// POSTデータの型
type Form = {
    section_name: string;
};

const CreateSectionPage: React.FC = () => {
    const navigate = useNavigate();

    const [validation, setValidation] = useState<Validation>({});
    const [section, setSection] = useState<Section>({
        id: 0,
        section_name: "",
        created_at: "",
        updated_at: "",
    });

    // React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();


    const onSubmit = async (data: Form) => {
        setValidation({});
        await axiosApi
            .post(`/api/admin/section`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                navigate(`/admin/section`);
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
    };

    return (
        <Dashboard title="">
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
                        セクション・マスター登録
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
                                {...register("section_name", {
                                    required: "必須入力です。",
                                })}
                                error={"section_name" in errors}
                                helperText={errors.section_name?.message}
                                defaultValue={section.section_name}
                                required
                                id="section_name"
                                label="セクション名"
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
                                <Link to="/admin/section">
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
        </Dashboard>
    );
};
export default CreateSectionPage;
