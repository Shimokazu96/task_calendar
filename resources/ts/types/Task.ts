export type Task = {
    id: number
    task_name: string
    display_flag: boolean
    description: string
    created_at: string
    updated_at: string
}
export type Form = {
    task_name: string;
    display_flag: boolean
    description: string;
};

export type Validation = {
    task_name?: string;
    description?: string;
};
