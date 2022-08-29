import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";

import { MasterRoutes } from "./route";
import { AdminRoutes } from "./route/admin";
import Login from "@/components/pages/login";
import Register from "@/components/pages/register";
import useAdminAuth from "@/hooks/useAdminAuth";
import useUserAuth from "@/hooks/useUserAuth";
import AdminLogin from "@/components/pages/admin/login";

// import AdminRoutes from "./route/admin";

const App: React.FC = () => {
    const location = useLocation();
    const { userStatus, fetchUser } = useUserAuth();
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
    const RouteUserAuthGuard = () => {
        if (authChecked) {
            return userStatus() ? <Outlet /> : <Navigate to="/login" replace />;
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
                path="/admin/login"
                element={
                    adminStatus() ? <Navigate to="/admin" /> : <AdminLogin />
                }
            />
        </Routes>
    );
};

export default App;
