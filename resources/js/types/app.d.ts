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

export interface Instrument {
    id: number;
    assessment_stage_id: number;
    name: string;
    type: string;
    description: string;
    allowed_extension: [];
    max_size?: string
    is_multiple?: number
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

export type AssessmentStep = {
    id: number;
    assessment_id : string;
    assessment_stage: {
        id:number;
        name: string;
    }
}

export type Assessment = {
    id: string;
    academic_semester_id : number;
    academic_semester: AcademicSemester;
    assessment_steps: AssessmentStep[];
    school: School;
    teacher : User;
    title?: null;
    created_at: string;
    updated_at: string;
}
