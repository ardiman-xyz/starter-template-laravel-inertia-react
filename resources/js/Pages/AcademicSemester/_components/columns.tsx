import { ColumnDef } from "@tanstack/react-table";
import { AcademicSemester } from "@/types/app";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { ClipboardEdit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirm from "@/Pages/AcademicSemester/_components/delete-confirm";
import { EditModal } from "@/Pages/AcademicSemester/_components/edit-modal";
import { router } from "@inertiajs/react";

export const columns: ColumnDef<AcademicSemester>[] = [
    {
        accessorKey: "academic_year",
        header: "Tahun Akademik",
    },
    {
        id: "semester",
        header: "Semester",
        cell: ({ row }) => {
            return <div className="capitalize">{row.original.semester}</div>;
        },
    },
    {
        accessorKey: "year",
        header: "Tahun",
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
        cell: ({ row }) => {
            return <ActionMenu data={row.original} />;
        },
    },
];

const ActionMenu = ({ data }: { data: AcademicSemester }) => {
    const [isModalInviteOpen, setIsModalInviteOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    const toggleModalInvite = () => setIsModalInviteOpen(!isModalInviteOpen);

    const handleModalEditClose = (isCancelled: boolean) => {
        setIsModalEditOpen(false);
        if (!isCancelled) {
            router.reload();
        }
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIsModalEditOpen(true)}
                    >
                        <ClipboardEdit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIsModalDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {isModalEditOpen && (
                <EditModal
                    data={data}
                    isOpen={isModalEditOpen}
                    onClose={(isCancelled) => handleModalEditClose(isCancelled)}
                />
            )}
            {isModalDeleteOpen && (
                <DeleteConfirm
                    data={data}
                    onClose={() => setIsModalDeleteOpen(false)}
                />
            )}
        </div>
    );
};
