import  z from "zod";

export const AcademicSemesterSchema = z
    .object({
        year: z.string().min(2, {
            message: "Input harus di isi",
        }),
        semester: z
            .string()
            .min(1, {
                message: "Input harus di isi",
            }),
        academic_year: z
            .string()
            .min(1, {
                message: "Input harus di isi",
            }),
        start_date: z.string().min(1, {
            message: "Input harus di isi",
        }),
        end_date: z.string().min(1, {
            message: "Input harus di isi",
        }),
    });


export const GeneralInfoSchema = z
    .object({
        school_name: z.string().min(2, {
            message: "Input harus di isi",
        }),
        leader_name: z
            .string()
            .min(1, {
                message: "Input harus di isi",
            }),
        address: z
            .string()
            .min(1, {
                message: "Input harus di isi",
            }),
        npsn: z.string(),
        education_level: z.string(),
        school_status: z.string(),
        email: z.string().email({
            message: "Email tidak valid"
        }),
    });
