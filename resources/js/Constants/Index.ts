export interface EducationLevel {
    value: string;
    label: string;
}

export interface SchoolStatus {
    value: string;
    label: string;
}

export const EDUCATION_LEVELS: EducationLevel[] = [
    { value: "PAUD", label: "PAUD (Pendidikan Anak Usia Dini)" },
    { value: "TK", label: "TK (Taman Kanak-kanak) / RA (Raudatul Athfal)" },
    { value: "SD", label: "SD (Sekolah Dasar) / MI (Madrasah Ibtidaiyah)" },
    { value: "SMP", label: "SMP (Sekolah Menengah Pertama) / MTs (Madrasah Tsanawiyah)" },
    { value: "SMA", label: "SMA (Sekolah Menengah Atas) / MA (Madrasah Aliyah)" },
    { value: "SMK", label: "SMK (Sekolah Menengah Kejuruan) / MAK (Madrasah Aliyah Kejuruan)" },
    { value: "SLB", label: "SLB (Sekolah Luar Biasa)" },
    { value: "PAKET_A", label: "Paket A (setara SD)" },
    { value: "PAKET_B", label: "Paket B (setara SMP)" },
    { value: "PAKET_C", label: "Paket C (setara SMA)" },
    { value: "PT", label: "Perguruan Tinggi" },
    { value: "PESANTREN", label: "Pondok Pesantren" }
];

export const SCHOOL_STATUSES: SchoolStatus[] = [
    { value: "negeri", label: "Negeri" },
    { value: "swasta", label: "Swasta" }
];

