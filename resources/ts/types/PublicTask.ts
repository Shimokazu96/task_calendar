export type PublicTask = {
    id: number;
    task_id: number;
    section_id: number;
    required_personnel: number;
    determined_personnel: number;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    task:{
        task_name:string;
    }
    section:{
        section_name:string;
    }
};
export type Form = {
    task_id: string;
    section_id: string;
    required_personnel: string;
    description: string;
    date: Date;
    start_time: Date;
    end_time: Date;
};

export type Validation = {
    task_name?: string;
    description?: string;
};