export type User = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}
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
