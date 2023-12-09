import React, {useState} from "react";
import {ClipboardEdit, MoreHorizontal, RotateCw, Trash2} from "lucide-react";

import {TableCell, TableRow} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";
import axios from "axios";
import {toast} from "sonner";
import {router} from "@inertiajs/react";
import {Textarea} from "@/Components/ui/textarea";

interface IProps {
    items: {
        id: number;
        title: string;
        max_score: number;
    },
    index: number;
    getData: () => void
}

type DefaultDataType = {
    id: number;
    title: string;
    max_score: number;
};


const InstrumentItemsTable = ({items, index, getData}: IProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const [defaultData, setDefaultData] = useState<DefaultDataType>({
        id: items.id,
        title: items.title,
        max_score: items.max_score,
    });

    const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setDefaultData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        await axios
            .put(`/instrumental/instrument/criteria`, defaultData)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                getData();
                toggleEdit();
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

    const handleDelete = async () => {
        const confirmation = window.confirm("Apakah Anda yakin ingin menghapus?");
        if (!confirmation) return;

        await axios
            .delete(`/instrumental/instrument/criteria/${items.id}`)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                getData()
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
        <TableRow key={items.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                {! isEditing && items.title}
                {
                    isEditing && (
                        <Textarea
                            disabled={isLoading}
                            className="md:w-[500px] w-max"
                            name="title"
                            defaultValue={defaultData.title}
                            onChange={handleChange}
                        />
                    )
                }
            </TableCell>
            <TableCell className="text-center">
                {!isEditing && items.max_score}
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
                    )
                }
                {
                    isEditing && (
                        <div className="flex gap-x-2">
                            <Button
                                disabled={isLoading}
                                onClick={toggleEdit}
                                variant="ghost"
                                size="sm"
                            >
                                Batal
                            </Button>
                            <Button
                                disabled={
                                    isLoading ||
                                    !defaultData.title ||
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
    )
}

export default InstrumentItemsTable;
