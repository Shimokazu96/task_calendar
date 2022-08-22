export type Section = {
    id: number
    section_name: string
    created_at: string
    updated_at: string
}
export type Form = {
    section_name: string;
};
export type Validation = {
    section_name?: string;
};
