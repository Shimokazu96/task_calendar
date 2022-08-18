import { Route } from "react-router-dom";
import TopPage from "@/components/pages/index";
import TaskPage from "@/components/pages/tasks";
import Register from "@/components/pages/register";
import UserPage from "@/components/pages/user";

export const MasterRoutes = (
    <>
        <Route path="/" element={<TopPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserPage />} />
    </>
);
