import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopPage from "./pages/index";
import TaskPage from "./pages/tasks";
import LoginPage from "./pages/login";

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                        <li>
                            <Link to="/login">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<TopPage />} />
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
