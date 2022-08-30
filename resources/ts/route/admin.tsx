import { lazy } from "react";
import { Route } from "react-router-dom";
import Dashboard from "@/components/layout/admin/Dashboard";
const TopPage = lazy(() => import("@/components/pages/admin/index"));
const CurrentDatePage = lazy(() => import("@/components/pages/admin/date/CurrentDate"));
const TaskPage = lazy(() => import("@/components/pages/admin/task"));
const CreateTaskPage = lazy(() => import("@/components/pages/admin/task/create"));
const EditTaskPage = lazy(() => import("@/components/pages/admin/task/edit"));
const PublicTaskPage = lazy(() => import("@/components/pages/admin/public_task"));
const CreatePublicTaskPage = lazy(() => import("@/components/pages/admin/public_task/create"));
const EditPublicTaskPage = lazy(() => import("@/components/pages/admin/public_task/edit"));
const CreateSectionPage = lazy(() => import("@/components/pages/admin/section/create"));
const SectionPage = lazy(() => import("@/components/pages/admin/section"));
const EditSectionPage = lazy(() => import("@/components/pages/admin/section/edit"));
const UserPage = lazy(() => import("@/components/pages/admin/user"));
const EditUserPage = lazy(() => import("@/components/pages/admin/user/edit"));
const CreateUserPage = lazy(() => import("@/components/pages/admin/user/create"));
const AdminSettingPage = lazy(() => import("@/components/pages/admin/setting"));

export const AdminRoutes = (
    <>
    <Route path="/admin" element={<Dashboard />}>
        <Route index element={<TopPage />} />
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
        <Route path="/admin/setting" element={<AdminSettingPage />} />
    </Route>
    </>
);
