import { useState } from "react";
import { Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

import { Hint } from "@/Components/Hint";
import { Button } from "@/Components/ui/button";
import { TableCell, TableRow } from "@/Components/ui/table";
import EditModal from "./edit-modal";

interface TableItemProps {
    id: string;
    name: string;
    index: number;
}

const TableItem = ({ id, name, index }: TableItemProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const toggleModalEdit = () => setIsEditModalOpen(!isEditModalOpen);
    const handleDelete = async (id: string) => {
        if (!confirm("Apakah anda yakin ?")) {
            return;
        }

        setIsLoading(true);

        await axios
            .delete(`roles/${id}`)
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
    };

    return (
        <>
            <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                    <Hint description="Edit" side="top" sideOffset={4}>
                        <Button
                            onClick={toggleModalEdit}
                            size="sm"
                            variant="outline"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Hint>
                    <Hint description="Hapus" side="top" sideOffset={4}>
                        <Button onClick={() => handleDelete(id)} size="sm">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </Hint>
                </TableCell>
            </TableRow>

            {isEditModalOpen && (
                <EditModal id={id} name={name} onClose={toggleModalEdit} />
            )}
        </>
    );
};

export default TableItem;
