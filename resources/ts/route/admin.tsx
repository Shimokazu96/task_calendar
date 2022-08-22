import { Route } from "react-router-dom";
import TopPage from "@/components/pages/admin/index";
import TaskPage from "@/components/pages/admin/task";
import SectionPage from "@/components/pages/admin/section";
import CreateSectionPage from "@/components/pages/admin/section/create";
import EditSectionPage from "@/components/pages/admin/section/edit";
import CreateTaskPage from "@/components/pages/admin/task/create";
import EditTaskPage from "@/components/pages/admin/task/edit";
import UserPage from "@/components/pages/admin/user";

export const AdminRoutes = (
    <>
        <Route path="/admin" element={<TopPage />} />
        <Route path="/admin/task" element={<TaskPage />} />
        <Route path="/admin/section" element={<SectionPage />} />
        <Route path="/admin/section/create" element={<CreateSectionPage />} />
        <Route path="/admin/section/:id" element={<EditSectionPage />} />
        <Route path="/admin/task/create" element={<CreateTaskPage />} />
        <Route path="/admin/task/:id" element={<EditTaskPage />} />
        <Route path="/admin/user" element={<UserPage />} />
    </>
);
