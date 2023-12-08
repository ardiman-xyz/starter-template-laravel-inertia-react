import React, {useState} from "react";
import axios from "axios";

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
import {toast} from "sonner";
import {router} from "@inertiajs/react";

interface IProps {
    id: number;
    name: string;
    type: string;
    index: number;
    stageId: number;
}

type DefaultDataType = {
    id: number;
    name: string;
    type: string;
};

const InstrumentTableItem = ({id, name, type, stageId, index}: IProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const [defaultData, setDefaultData] = useState<DefaultDataType>({
        id,
        name,
        type,
    });

    const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setDefaultData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async () => {
        setIsLoading(true);
        await axios
            .put(`/instrumental/${stageId}/instrument`, defaultData)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
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
    };

    return (
        <TableRow key={id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                {!isEditing && name}
                {isEditing && (
                    <Input
                        type="text"
                        disabled={isLoading}
                        className="w-max"
                        name="name"
                        defaultValue={defaultData.name}
                        onChange={handleChange}
                    />
                )}
            </TableCell>
            <TableCell>
                {!isEditing && type}

                {
                    isEditing && (
                        <select
                            name="type"
                            value={defaultData.type}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-max"
                        >
                            <option value="upload">Upload</option>
                            <option value="link">Link</option>
                            <option value="streaming">Streaming</option>
                            <option value="report">Wawancara offline</option>
                        </select>
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
                                    !defaultData.name ||
                                    defaultData.type === ""
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

export default InstrumentTableItem;
