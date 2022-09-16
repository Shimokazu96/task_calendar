export type Section = {
    id: number
    display_flag: boolean
    section_name: string
    created_at: string
    updated_at: string
}
export type Form = {
    display_flag: boolean;
    section_name: string;
};
export type Validation = {
    section_name?: string;
};
