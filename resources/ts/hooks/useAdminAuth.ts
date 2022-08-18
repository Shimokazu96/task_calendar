import { useAdminState } from "@/atoms/adminAtom";
import { axiosApi } from "@/lib/axios";

const useAdminAuth = () => {
    const { admin, setAdmin } = useAdminState();

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

    return { adminStatus, fetchAdmin };
};
export default useAdminAuth;
