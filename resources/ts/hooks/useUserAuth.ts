import { useUserState } from "@/atoms/userAtom";
import { axiosApi } from "@/lib/axios";

const useUserAuth = () => {
    const { user, setUser } = useUserState();

    const userStatus = () => {
        return user ? true : false;
    };

    const fetchUser = async (): Promise<boolean> => {
        if (user) {
            return true;
        }
        try {
            const res = await axiosApi.get("/api/user");
            if (!res.data) {
                setUser(null);

                return false;
            }
            setUser(res.data);
            return true;
        } catch {
            return false;
        }
    };

    return { userStatus, fetchUser };
};
export default useUserAuth;
