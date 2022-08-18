import { useUserState } from "@/atoms/userAtom";
import { axiosApi } from "@/lib/axios";

export const useUserAuthenticate = () => {
    const { user, setUser } = useUserState();

    const authenticate = async (): Promise<boolean> => {
        if (user) {
            console.log(user);
            return true;
        }

        try {
            const res = await axiosApi.get("/api/user");
            if (!res.data) {
                return false;
            }
            setUser(res.data);
            return true;
        } catch {
            return false;
        }
    };

    return { authenticate };
};
