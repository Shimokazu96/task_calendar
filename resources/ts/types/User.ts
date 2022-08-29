export type User = {
    id: number
    name: string
    email: string
    password: string
    password_confirmation: string
    email_verified_at: string
    created_at: string
    updated_at: string
}
export type RegisterForm = {
    name: string;
    email: string;
    password: string
    password_confirmation: string
};
export type ProfileInformationForm = {
    name: string;
    email: string;
};
export type PasswordUpdateForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};
export type ApplicantUsers = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    pivot: {
        fixed:boolean
        task_completion_notifications:boolean
    }
}
