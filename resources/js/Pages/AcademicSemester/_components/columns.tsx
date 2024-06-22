
import { ColumnDef } from "@tanstack/react-table"
import {AcademicSemester} from "@/types/app";


export const columns: ColumnDef<AcademicSemester>[] = [
    {
        accessorKey: "academic_year",
        header: "Tahun Akademik",
    },
    {
        accessorKey: "semester",
        header: "Semester",
    },
    {
        accessorKey: "start_date",
        header: "Mulai",
    },
    {
        accessorKey: "end_date",
        header: "Berakhir",
    },
    {
        id: "action",
        header: "aksi",
    },
]
