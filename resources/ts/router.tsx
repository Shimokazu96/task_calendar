import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopPage from "@/components/pages/index";
import TaskPage from "@/components/pages/tasks";
import LoginPage from "@/components/pages/login";
import UserPage from "@/components/pages/user";

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
