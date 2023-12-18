import {ComponentDetail} from "@/types/app";
import {TableCell, TableRow} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {ClipboardEdit, Link2, MoreHorizontal, RotateCw, Trash2} from "lucide-react";
import React, {useState} from "react";
import DeleteConfirm from "@/Pages/Instruments/_components/delete-confirm";
import {Textarea} from "@/Components/ui/textarea";
import axios from "axios";
import {toast} from "sonner";
import {router} from "@inertiajs/react";
import {Input} from "@/Components/ui/input";

interface IProps {
    instrument: ComponentDetail;
    index: number;
}

type DefaultDataType = {
    id: number;
    name: string;
    max_score: number;
};


export const InstrumentItemDetail = ({instrument, index}: IProps) => {

    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [defaultData, setDefaultData] = useState<DefaultDataType>({
        id: instrument.id,
        name: instrument.name,
        max_score: instrument.max_score,
    });

    const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setDefaultData((prevData) => ({ ...prevData, [name]: value }));
    };

    const toggleEditing = () => setIsEditing(!isEditing);

    const handleSubmit = async () => {
        setIsLoading(true)
        await axios
            .put(`/instruments/${defaultData.id}/item`, defaultData)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
                toggleEditing();
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
            <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="capitalize">
                    {!isEditing && instrument.name}
                    {
                        isEditing && (
                            <Textarea
                                disabled={isLoading}
                                className="md:w-[500px] w-max"
                                name="name"
                                defaultValue={defaultData.name}
                                onChange={handleChange}
                            />
                        )
                    }
                </TableCell>
                <TableCell>
                    {!isEditing && instrument.max_score}
                    {
                        isEditing && (
                            <Input
                                type="number"
                                disabled={isLoading}
                                className="w-[80px]"
                                name="max_score"
                                defaultValue={defaultData.max_score}
                                onChange={handleChange}
                            />
                        )
                    }
                </TableCell>
                <TableCell>
                    {
                        !isEditing && (
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
                                onClick={toggleEditing}
                            >
                                <ClipboardEdit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setDeleteConfirm(true)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        )
                    }

                    {
                        isEditing && (
                            <div className="flex gap-x-2">
                                <Button
                                    disabled={isLoading}
                                    onClick={toggleEditing}
                                    variant="ghost"
                                    size="sm"
                                >
                                    Batal
                                </Button>
                                <Button
                                    disabled={
                                        isLoading ||
                                        !defaultData.name ||
                                        defaultData.max_score === null
                                    }
                                    onClick={handleSubmit}
                                    size="sm"
                                >
                                    {isLoading && (
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Simpan
                                </Button>
                            </div>
                        )
                    }
                </TableCell>
            </TableRow>

            {
                deleteConfirm && (
                    <DeleteConfirm
                        id={instrument.id}
                        onClose={() => setDeleteConfirm(false)}
                    />
                )
            }
        </>
    )
}
