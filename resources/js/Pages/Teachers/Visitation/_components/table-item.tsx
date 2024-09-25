import { FileDown, Info, MoreHorizontal } from "lucide-react";
import { router } from "@inertiajs/react";
import { cn } from "@/lib/utils";

import { Assessment } from "@/types/app";
import VisitationStatus from "./visitation-status";

import { TableCell, TableRow } from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";

interface TableItemProps {
    data: Assessment;
    index: number;
    togglePreviewReport: (event: React.MouseEvent) => void;
}

export const TableItem = ({
    data,
    index,
    togglePreviewReport,
}: TableItemProps) => {
    const handleClick = () => {
        return router.visit(route("teacher.visitation.show", data.id));
    };

    const handleDownload = (event: React.MouseEvent) => {
        event.stopPropagation();
        router.visit(route("report.teacher"));
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
                            <DropdownMenuItem
                                onClick={handleDownload}
                                className="cursor-pointer"
                            >
                                <FileDown className="h-4 w-4 mr-2" />
                                Report
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};
