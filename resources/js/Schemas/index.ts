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
