import { lazy } from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/layout/front/Layout";
const TopPage = lazy(() => import("@/components/pages/index"));
const CurrentDatePage = lazy(() => import("@/components/pages/date/CurrentDate"));
const TaskPage = lazy(() => import("@/components/pages/task"));
const UserPage = lazy(() => import("@/components/pages/user"));

export const MasterRoutes = (
    <>
        <Route path="/" element={<Layout />}>
            <Route index element={<TopPage />} />
            <Route path="/date/:date" element={<CurrentDatePage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/user" element={<UserPage />} />
        </Route>
    </>
);
