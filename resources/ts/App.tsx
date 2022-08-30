import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import { MasterRoutes } from "./route";
import { AdminRoutes } from "./route/admin";
import Login from "@/components/pages/login";
import Register from "@/components/pages/register";
import EmailVerify from "@/components/pages/emailVerify";
import useAdminAuth from "@/hooks/useAdminAuth";
import useUserAuth from "@/hooks/useUserAuth";
import AdminLogin from "@/components/pages/admin/login";

// import AdminRoutes from "./route/admin";

const App: React.FC = () => {
    const location = useLocation();
    const { userStatus, emailVerified, fetchUser } = useUserAuth();
    const { adminStatus, fetchAdmin } = useAdminAuth();
    // ログイン状態の確認が終わったか
    const [authChecked, setAuthChecked] = useState(false);

    // 初回レンダリング時にAPIリクエスト
    useEffect(() => {
        const init = async () => {
            // ログイン中か判定
            if (location.pathname.indexOf("/admin") > -1) {
                await fetchAdmin();
                return setAuthChecked(true);
            }
            await fetchUser();
            return setAuthChecked(true);
        };
        init();
    }, []);
    console.log("email:" + emailVerified());
    console.log("user:" + userStatus());
    const RouteUserAuthGuard = () => {
        if (authChecked) {
            if (userStatus() && emailVerified()) {
                return <Outlet />;
            } else if (userStatus() && !emailVerified()) {
                return <Navigate to="/email/verify" replace />;
            } else {
                return <Navigate to="/login" replace />;
            }
        } else {
            return <></>;
        }
    };
    const RouteAdminAuthGuard = () => {
        if (authChecked) {
            return adminStatus() ? (
                <Outlet />
            ) : (
                <Navigate to="/admin/login" replace />
            );
        } else {
            return <></>;
        }
    };

    return (
        <Routes>
            <Route element={<RouteUserAuthGuard />}>{MasterRoutes}</Route>
            <Route element={<RouteAdminAuthGuard />}>{AdminRoutes}</Route>
            <Route
                path="/login"
                element={userStatus() ? <Navigate to="/" /> : <Login />}
            />
            <Route
                path="/register"
                element={userStatus() ? <Navigate to="/" /> : <Register />}
            />
            <Route
                path="/email/verify"
                element={
                    userStatus() && emailVerified() ? (
                        <Navigate to="/" />
                    ) : userStatus() && !emailVerified() ? (
                        <EmailVerify />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path="/admin/login"
                element={
                    adminStatus() ? <Navigate to="/admin" /> : <AdminLogin />
                }
            />
        </Routes>
    );
};

export default App;
