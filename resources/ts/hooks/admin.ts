import { useAdminState } from "@/atoms/adminAtom";
import { axiosApi } from "@/lib/axios";

export const useAdminAuthenticate = () => {
    const { admin, setAdmin } = useAdminState();

    const authenticate = async (): Promise<boolean> => {
        if (admin) {
            console.log(admin);
            return true;
        }

        try {
            const res = await axiosApi.get("/api/admin");
            if (!res.data) {
                return false;
            }
            setAdmin(res.data);
            return true;
        } catch {
            return false;
        }
    };

    return { authenticate };
};
