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


export const AccountFormSchema = z
    .object({
        old_password: z.string().min(1, "Kata sandi lama harus diisi"),
        new_password: z
            .string()
            .min(1, "Kata sandi baru harus diisi")
            .min(8, "Kata sandi baru harus memiliki minimal 8 karakter"),
        confirm_password: z.string().min(1, "Konfirmasi kata sandi harus diisi"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Konfirmasi kata sandi tidak cocok dengan kata sandi baru",
        path: ["confirm_password"],
    });

export const PersonalInfoSchema = z
    .object({
        email: z.string().email({
            message: "Email tidak valid"
        }).min(1, "Username lama harus diisi"),
    })

