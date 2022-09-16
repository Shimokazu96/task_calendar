import React from "react";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogContent,
    TextField,
    Grid,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { Section, Form } from "@/types/Section";
import useNotification from "@/hooks/useNotification";
// import Loading from "@/components/parts/Loading";

type Props = {
    open: boolean;
    close: VoidFunction;
};

export default function CreateSectionDialog(props: Props) {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);
    const [rendering, setRendering] = useState(false);
    const { saved, error } = useNotification();

    const [section, setSection] = useState<Section>({
        id: 0,
        section_name: "",
        display_flag: false,
        created_at: "",
        updated_at: "",
    });

    useEffect(() => {
        if (props.open) {
            return setRendering(true);
        }
        if (!props.open) {
            return setRendering(false);
        }
        return setRendering(false);
    }, [props.open]);
    // React-Hook-Form
    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Form>();

    const dialogClose = async () => {
        setValue("section_name", "");
        props.close();
    };

    const onSubmit = async (data: Form) => {
        await axiosApi
            .post(`/api/admin/section`, data)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                saved();
                navigate(`/admin/public_task/create`);
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
        reset();
    };
    if (!rendering) {
        return <></>;
    }
    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={props.open}
                keepMounted
                onClose={() => dialogClose()}
                aria-labelledby="common-dialog-title"
                aria-describedby="common-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <FormControlLabel
                                sx={{ ml: 0 }}
                                control={
                                    <Switch
                                        {...register("display_flag")}
                                        defaultChecked={section.display_flag}
                                        color="primary"
                                    />
                                }
                                label="表示・非表示"
                                labelPlacement="start"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                {...register("section_name", {
                                    required: "必須入力です。",
                                })}
                                error={"section_name" in errors}
                                sx={{ mb: 2 }}
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
                                <Button onClick={() => dialogClose()}>
                                    キャンセル
                                </Button>

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
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
