import { TableCell, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    ClipboardList,
    Menu,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";
import { Component } from "@/types/app";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { EditModal } from "./edit-modal";

interface TablteItemProps {
    item: Component;
    index: number;
}

export const TableItem = ({ item, index }: TablteItemProps) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

    const handleClickDetail = () => {
        router.get(route("instrument.detail", item.id));
    };

    return (
        <>
            <TableRow
                key={index}
                onClick={() => handleClickDetail()}
                className="cursor-pointer group"
            >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="capitalize">
                    <span className="group-hover:underline text-blue-700 group-hover:text-blue-800 transition-colors">
                        {item.name}
                    </span>
                </TableCell>
                <TableCell className="text-center">
                    {item.details.length}
                </TableCell>
                <TableCell className="text-center">
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant={"ghost"} size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-x-1"
                                    onClick={handleClickDetail}
                                >
                                    <ClipboardList className="h-4 w-4" />
                                    Detail
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setIsModalEditOpen(true)}
                                    className="cursor-pointer flex items-center gap-x-1"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer flex items-center gap-x-1 text-muted-foreground">
                                    <Trash2 className="h-4 w-4" />
                                    Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TableCell>
            </TableRow>

            <EditModal
                defaultData={{ name: item.name, id: item.id }}
                isOpen={isModalEditOpen}
                onClose={() => setIsModalEditOpen(false)}
            />
        </>
    );
};
