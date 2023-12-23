import {router} from "@inertiajs/react";
import React from "react";

import {TableCell, TableRow} from "@/Components/ui/table";

interface TableItemProps {
    id: string;
    year: string;
    semester: string;
    index: number;
    key: number;
}

export const TableItem = ({id, key, index, year, semester}: TableItemProps) => {

    const handleClick = () => {
        return router.visit(route("teacher.visitation.show", id))
    }

    return (
        <TableRow key={index} className="group cursor-pointer" onClick={handleClick}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-blue-800 underline">{year}</TableCell>
            <TableCell>{semester}</TableCell>
        </TableRow>
    )
}
