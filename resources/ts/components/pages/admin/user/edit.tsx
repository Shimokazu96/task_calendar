import * as React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios";
import Dashboard from "@/components/templates/admin/Dashboard";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { User } from "@/types/User";
import Loading from "@/components/parts/Loading";
import ProfileInformation from "@/components/templates/admin/user/ProfileInformation";
import PasswordUpdate from "@/components/templates/admin/user/PasswordUpdate";

const EditUserPage: React.FC = () => {
    const params = useParams(); // URLのパスパラメータを取得。例えば、 /uses/2 なら、2の部分を取得
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
            .get(`/api/admin/user/${params.id}`)
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
                        スタッフ編集
                    </Typography>
                </Box>
            </Box>
            <ProfileInformation user={user} />
            <PasswordUpdate user={user} />
        </Dashboard>
    );
};
export default EditUserPage;
