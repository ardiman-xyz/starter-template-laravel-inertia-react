import {Component} from "@/types/app";
import {TableCell, TableRow} from "@/Components/ui/table";
import React from "react";
import {TableItemDetail} from "@/Pages/Visitation/_components/detail/table-item-detail";

interface TableItemProps {
    instrument: Component;
    index: number
}

export const TableItem = ({instrument, index}: TableItemProps) => {

    return (
        <>
            <TableRow>
                <TableCell className="text-center border" rowSpan={instrument.details.length + 1}>{index + 1}</TableCell>
                <TableCell className="border font-semibold text-lg">{instrument.name}</TableCell>
            </TableRow>
            {instrument.details.map((item, itemIndex) => (
                <TableItemDetail
                    index={itemIndex}
                    key={itemIndex}
                    data={item}
                    instrument={instrument}
                />
            ))}
        </>
    )
}
