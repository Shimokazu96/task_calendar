import { lazy } from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/layout/front/Layout";
const TopPage = lazy(() => import("@/components/pages/index"));
const CurrentDatePage = lazy(() => import("@/components/pages/date/CurrentDate"));
const PublicTaskPage = lazy(() => import("@/components/pages/publicTask"));
const DetailPublicTaskPage = lazy(() => import("@/components/pages/publicTask/detail"));
const MyPage = lazy(() => import("@/components/pages/mypage"));
const AppliedTaskPage = lazy(() => import("@/components/pages/mypage/applied_task"));
const FixedTaskPage = lazy(() => import("@/components/pages/mypage/fixed_task"));

export const MasterRoutes = (
    <>
        <Route path="/" element={<Layout />}>
            <Route index element={<TopPage />} />
            <Route path="/date/:date" element={<CurrentDatePage />} />
            <Route path="/public_task" element={<PublicTaskPage />} />
            <Route path="/public_task/:id" element={<DetailPublicTaskPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/applied_task" element={<AppliedTaskPage />} />
            <Route path="/mypage/fixed_task" element={<FixedTaskPage />} />
        </Route>
    </>
);
