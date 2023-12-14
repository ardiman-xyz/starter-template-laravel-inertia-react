import {router} from "@inertiajs/react";

import {TableCell, TableRow} from "@/Components/ui/table";
import {Badge} from "@/Components/ui/badge";

interface TableItemProps {
    id: string;
    year: string;
    semester: string;
    index: number;
}

export const TableItem = ({id, year, semester, index}: TableItemProps) => {

    const handleClick = () => {
        router.visit(route("teacher.visitation.show", id))
    }

    return (
        <TableRow className="cursor-pointer group" onClick={handleClick}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                <span className="group-hover:underline transition text-blue-800">
                    {year}
                </span>
            </TableCell>
            <TableCell>
                 <span className="group-hover:underline transition text-blue-800">
                    {semester}
                </span>
            </TableCell>
            <TableCell>
                <Badge
                    variant="secondary"
                    className= "bg-yellow-200"
                >
                    Sedang berlangsung
                </Badge>
            </TableCell>
        </TableRow>
    )
}
