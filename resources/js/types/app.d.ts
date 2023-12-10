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

// export interface A
