import { Route } from "react-router-dom";
import TopPage from "@/components/pages/admin/index";
import CurrentDatePage from "@/components/pages/admin/date/CurrentDate";
import TaskPage from "@/components/pages/admin/task";
import CreateTaskPage from "@/components/pages/admin/task/create";
import EditTaskPage from "@/components/pages/admin/task/edit";
import PublicTaskPage from "@/components/pages/admin/public_task";
import CreatePublicTaskPage from "@/components/pages/admin/public_task/create";
import EditPublicTaskPage from "@/components/pages/admin/public_task/edit";
import CreateSectionPage from "@/components/pages/admin/section/create";
import SectionPage from "@/components/pages/admin/section";
import EditSectionPage from "@/components/pages/admin/section/edit";
import UserPage from "@/components/pages/admin/user";
import EditUserPage from "@/components/pages/admin/user/edit";
import CreateUserPage from "@/components/pages/admin/user/create";

export const AdminRoutes = (
    <>
        <Route path="/admin" element={<TopPage />} />
        <Route path="/admin/date/:date" element={<CurrentDatePage />} />
        <Route path="/admin/section" element={<SectionPage />} />
        <Route path="/admin/section/create" element={<CreateSectionPage />} />
        <Route path="/admin/section/:id" element={<EditSectionPage />} />
        <Route path="/admin/task" element={<TaskPage />} />
        <Route path="/admin/task/create" element={<CreateTaskPage />} />
        <Route path="/admin/task/:id" element={<EditTaskPage />} />
        <Route path="/admin/public_task" element={<PublicTaskPage />} />
        <Route path="/admin/public_task/create" element={<CreatePublicTaskPage />} />
        <Route path="/admin/public_task/:id" element={<EditPublicTaskPage />} />
        <Route path="/admin/user" element={<UserPage />} />
        <Route path="/admin/user/create" element={<CreateUserPage />} />
        <Route path="/admin/user/:id" element={<EditUserPage />} />
    </>
);
