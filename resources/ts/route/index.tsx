import { lazy } from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/layout/front/Layout";
const TopPage = lazy(() => import("@/components/pages/index"));
const CurrentDatePage = lazy(() => import("@/components/pages/date/CurrentDate"));
const PublicTaskPage = lazy(() => import("@/components/pages/publicTask"));
const DetailPublicTaskPage = lazy(() => import("@/components/pages/publicTask/detail"));
const UserPage = lazy(() => import("@/components/pages/user"));

export const MasterRoutes = (
    <>
        <Route path="/" element={<Layout />}>
            <Route index element={<TopPage />} />
            <Route path="/date/:date" element={<CurrentDatePage />} />
            <Route path="/public_task" element={<PublicTaskPage />} />
            <Route path="/public_task/:id" element={<DetailPublicTaskPage />} />
            <Route path="/mypage" element={<UserPage />} />
        </Route>
    </>
);
