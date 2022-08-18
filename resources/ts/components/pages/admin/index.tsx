import React from "react";
import { useEffect, useState } from "react";
import Dashboard from "@/components/templates/dashboard";
import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";
import { axiosApi } from '@/lib/axios';
import { Task } from "@/types/Task";

const TopPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async () => {
        await axiosApi
            .get("/api/tasks")
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((err: AxiosError) => console.log(err.response));
        return tasks;
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Dashboard title="トップページ">
            <>Task Page</>
            {tasks.map((task: Task, index) => {
                return (
                    <ul key={index}>
                        <li className="">{task.title}</li>
                    </ul>
                );
            })}
        </Dashboard>
    );
};

export default TopPage;
