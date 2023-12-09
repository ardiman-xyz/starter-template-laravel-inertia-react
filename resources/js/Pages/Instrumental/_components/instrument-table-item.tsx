import React, {useState} from "react";
import axios from "axios";
import {toast} from "sonner";

import {ClipboardEdit, MoreHorizontal, Trash2} from "lucide-react";

import {TableCell, TableRow} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {router} from "@inertiajs/react";

import {Instrument} from "@/types/app";
import EditInstrumentModal from "@/Pages/Instrumental/_components/edit-instrument-modal";
import {flattenBy} from "@tanstack/react-table";

interface IProps {
    instrument: Instrument;
    index: number;
}

const InstrumentTableItem = ({instrument, index}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)

    const toggleEdit = () => setIsModalEditOpen(!isModalEditOpen);

    const handleDelete = async () => {
        const confirmation = window.confirm("Apakah Anda yakin ingin menghapus?");
        if (!confirmation) return;

        await axios
            .delete(`/instrumental/${instrument.id}/instrument`)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
            })
            .catch((err) => {
                const { data, status, statusText } = err.response;
                toast.error(`${statusText} ${status}`, {
                    description: `${data.message}`,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <TableRow key={instrument.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                    {instrument.name}
                </TableCell>
                <TableCell>
                    {instrument.type}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={toggleEdit}
                            >
                                <ClipboardEdit className="h-4 w-4 mr-2"/>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            {
                isModalEditOpen && <EditInstrumentModal onClose={() =>setIsModalEditOpen(false) } instrument={instrument} />
            }
        </>
    )
}

export default InstrumentTableItem;
