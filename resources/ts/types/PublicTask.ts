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
    applied_public_task: boolean;
    task_completion_notification: boolean;
    fixed_applied_public_task: boolean;
    task: {
        task_name: string;
    };
    section: {
        section_name: string;
        color: any;
    };
    applicant_users: {
        length: number;
    };
};
export type Form = {
    task_id: string;
    section_id: string;
    required_personnel: string;
    description: string;
    date: Date | null;
    start_time: Date | null;
    end_time: Date | null;
};

export type Validation = {
    task_name?: string;
    description?: string;
};

export type AppliedTask = [];
