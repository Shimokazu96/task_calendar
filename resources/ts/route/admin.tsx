import { Route } from "react-router-dom";
import TopPage from "@/components/pages/admin/index";
import TaskPage from "@/components/pages/admin/tasks";
import SectionPage from "@/components/pages/admin/section";
import UserPage from "@/components/pages/admin/user";

export const AdminRoutes = (
    <>
        <Route path="/admin" element={<TopPage />} />
        <Route path="/admin/task" element={<TaskPage />} />
        <Route path="/admin/section" element={<SectionPage />} />
        <Route path="/admin/user" element={<UserPage />} />
    </>
);
