import { useNavigate } from "react-router-dom";
import { useUserState } from "@/atoms/userAtom";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";
import useNotification from "@/hooks/useNotification";

const useUserAuth = () => {
    const { user, setUser } = useUserState();
    const navigate = useNavigate();
    const { error } = useNotification();

    const userStatus = () => {
        return user ? true : false;
    };
    const emailVerified = () => {
        return user && user.email_verified_at ? true : false;
    };

    const fetchUser = async (): Promise<boolean> => {
        if (user) {
            return true;
        }
        try {
            const res = await axiosApi.get("/api/user");
            if (!res.data) {
                axiosApi.get("/api/reflesh-token");
                setUser(null);
                return false;
            }
            setUser(res.data);
            return true;
        } catch {
            return false;
        }
    };

    const logout = async () => {
        await axiosApi
            .post("/api/logout")
            .then((response: AxiosResponse) => {
                setUser(null);
                navigate("/login");
            })
            .catch((err: any) => {
                console.log(err.response);
                if (err.response?.status === 500) {
                    error("システムエラーです！！");
                }
            });
    };

    return { userStatus, emailVerified, fetchUser, logout };
};
export default useUserAuth;
