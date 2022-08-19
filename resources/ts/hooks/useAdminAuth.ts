import { useNavigate } from "react-router-dom";
import { useAdminState } from "@/atoms/adminAtom";
import { axiosApi } from "@/lib/axios";
import { AxiosResponse } from "axios";

const useAdminAuth = () => {
    const { admin, setAdmin } = useAdminState();
    const navigate = useNavigate();

    const adminStatus = () => {
        return admin ? true : false;
    };

    const fetchAdmin = async (): Promise<boolean> => {
        if (admin) {
            return true;
        }
        try {
            const res = await axiosApi.get("/api/admin");
            if (!res.data) {
                setAdmin(null);

                return false;
            }
            setAdmin(res.data);
            return true;
        } catch {
            return false;
        }
    };

    const logout = async () => {
        await axiosApi
            .post("/api/admin/logout")
            .then((response: AxiosResponse) => {
                setAdmin(null);
                navigate("/admin/login");
            })
            .catch((err: any) => {
                console.log(err.response);
                if (err.response?.status === 500) {
                    alert("システムエラーです！！");
                }
            });
    };

    return { adminStatus, fetchAdmin, logout };
};
export default useAdminAuth;
