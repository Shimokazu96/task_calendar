import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "@/components/pages/index";
import TaskPage from "@/components/pages/tasks";
import Login from "@/components/pages/login";
import Register from "@/components/pages/register";
import UserPage from "@/components/pages/user";

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
