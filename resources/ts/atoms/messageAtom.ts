// user global state
import { atom, useRecoilState } from "recoil";

type messageState = { content: string; } | null;

const messageState = atom<messageState>({
    key: "message",
    default: null,
});

export const useMessageState = () => {
    const [message, setMessage] = useRecoilState<messageState>(messageState);

    return { message, setMessage };
};
