import * as React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { User } from "@/types/User";
import Loading from "@/components/parts/Loading";
import ProfileInformation from "@/components/templates/front/setting/ProfileInformation";
import PasswordUpdate from "@/components/templates/front/setting/PasswordUpdate";
import Header from "@/components/templates/front/Header";

const SettingMyPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        await axiosApi
            .get(`/api/user`)
            .then((response: AxiosResponse) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return user;
    };

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <Loading open={loading} />;
    }
    return (
        <>
            <Header title={"アカウント設定"} link={"/mypage"} />
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    mt: { xs: "12%", md: "64px" },
                    mb: "60px"
                }}
            >
                <ProfileInformation user={user} />
                <PasswordUpdate />
            </Box>
        </>
    );
};
export default SettingMyPage;
