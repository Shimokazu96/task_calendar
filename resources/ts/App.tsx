import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MasterRoutes } from "./route";
import { AdminRoutes } from "./route/admin";
import Login from "@/components/pages/login";
import AdminLogin from "@/components/pages/admin/login";

// import AdminRoutes from "./route/admin";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                {MasterRoutes}
                {AdminRoutes}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
