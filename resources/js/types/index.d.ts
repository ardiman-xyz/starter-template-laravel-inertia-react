export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    profile_picture: string;
    gender: string;
    address: string;
    nip: string;
    phone_number: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
