import * as React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Admin } from "@/types/Admin";
import Loading from "@/components/parts/Loading";
import ProfileInformation from "@/components/templates/admin/setting/ProfileInformation";
import PasswordUpdate from "@/components/templates/admin/setting/PasswordUpdate";

const AdminSettingPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState<Admin>({
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        password: "",
        password_confirmation: "",
        created_at: "",
        updated_at: "",
    });
    const [loading, setLoading] = useState(true);

    const getAdmin = async () => {
        await axiosApi
            .get(`/api/admin`)
            .then((response: AxiosResponse) => {
                setAdmin(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return admin;
    };

    useEffect(() => {
        getAdmin();
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }
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
                        スタッフ編集
                    </Typography>
                </Box>
            </Box>
            <ProfileInformation admin={admin} />
            <PasswordUpdate />
        </>
    );
};
export default AdminSettingPage;
