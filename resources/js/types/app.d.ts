export interface Role {
    id: string;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    gender?: string;
    nip?: string;
    address?: string;
    phone_number: string;
    profile_picture?: string;
    created_at: string;
    updated_at: string;
}

export type Schedule = {
    id: number;
    status: boolean;
    started_at? : string;
    finished_at?: string;
    progress?: string;
}

export interface Instrument {
    id: number;
    assessment_stage_id: number;
    name: string;
    type: string;
    description: string;
    allowed_extension: [];
    max_size?: string;
    is_multiple?: number;
    scheduled? : Schedule
}

export type AcademicSemester = {
    id: number;
    year: string;
    semester: string;
    create_at?: string;
    updated_at?: string;
}
export type School = {
    id: number;
    name: string;
    leader_name: string;
    address?: string;
    create_at?: string;
    updated_at?: string;
}

export type StageSchedule = {
    name: string;
    isAllFinished: boolean;
    instruments: Instrument[]
}

export type Assessment = {
    id: string;
    academic_semester_id : number;
    academic_semester: AcademicSemester;
    school: School;
    teacher : User;
    title?: null;
    created_at: string;
    updated_at: string;
}

export type Component = {
    id: number;
    name: string;
    type?: string;
    description?: string;
    allowed_extension?: [];
    max_size?: string;
    is_multiple?: number;
    details: ComponentDetail [];
}

export type ComponentDetail = {
    id: number;
    name: string;
    max_score: number
}
