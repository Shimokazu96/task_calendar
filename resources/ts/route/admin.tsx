import { Route } from "react-router-dom";
import TopPage from "@/components/pages/admin/index";
import TaskPage from "@/components/pages/admin/task";
import SectionPage from "@/components/pages/admin/section";
import EditSectionPage from "@/components/pages/admin/section/edit";
import CreateSectionPage from "@/components/pages/admin/section/create";
import UserPage from "@/components/pages/admin/user";

export const AdminRoutes = (
    <>
        <Route path="/admin" element={<TopPage />} />
        <Route path="/admin/task" element={<TaskPage />} />
        <Route path="/admin/section" element={<SectionPage />} />
        <Route path="/admin/section/create" element={<CreateSectionPage />} />
        <Route path="/admin/section/:id" element={<EditSectionPage />} />
        <Route path="/admin/user" element={<UserPage />} />
    </>
);
