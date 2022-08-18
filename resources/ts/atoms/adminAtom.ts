// user global state
import { atom, useRecoilState } from "recoil";

type adminState = { id: number } | null;

const adminState = atom<adminState>({
    key: "admin",
    default: null,
});

export const useAdminState = () => {
    const [admin, setAdmin] = useRecoilState<adminState>(adminState);

    return { admin, setAdmin };
};
