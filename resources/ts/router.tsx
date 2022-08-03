import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopPage from "@/components/pages/index";
import TaskPage from "@/components/pages/tasks";
import LoginPage from "@/components/pages/login";

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
