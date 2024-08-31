import React from "react";
import { router } from "@inertiajs/react";

import { Assessment } from "@/types/app";

import { TableCell, TableRow } from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { FileDown, Info, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import VisitationStatus from "./visitation-status";

interface TableItemProps {
    data: Assessment;
    index: number;
}

export const TableItem = ({ data, index }: TableItemProps) => {
    const handleClick = () => {
        return router.visit(route("teacher.visitation.show", data.id));
    };

    return (
        <TableRow
            className={cn(
                "group cursor-pointer",
                data.status === "schedule" ? "bg-red-50 hover:bg-red-100" : ""
            )}
            onClick={handleClick}
        >
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-blue-800 underline">
                {data.academic_semester.year}
            </TableCell>
            <TableCell className="capitalize">
                {data.academic_semester.semester}
            </TableCell>
            <TableCell>
                <VisitationStatus data={data} />
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                            <Info className="h-4 w-4 mr-2" />
                            Informasi
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {data.status === "finish" && (
                            <DropdownMenuItem className="cursor-pointer">
                                <FileDown className="h-4 w-4 mr-2" />
                                Donwload report
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};
