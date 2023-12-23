import {TableCell, TableRow} from "@/Components/ui/table";
import React from "react";

import {Component, ComponentDetail} from "@/types/app";


interface IProps {
    index: number;
    data: ComponentDetail;
    instrument: Component
}


export const InstrumentItemDetail = ({data, index, instrument}: IProps) => {


    return (
        <TableRow className="relative">
            <TableCell className="border">{`${String.fromCharCode(97 + index)}. ${data.name}`}</TableCell>
            <TableCell className="text-center border">
                {
                    data.scored.status && data.scored.score === 1 && (
                       <span className="text-green-700">
                           	&#10004;
                       </span>
                    )
                }
            </TableCell>
            <TableCell className="text-center border">
                {
                    data.scored.status && data.scored.score === 2 && (
                       <span className="text-green-700">
                           	&#10004;
                       </span>
                    )
                }
            </TableCell>
            <TableCell className="text-center border">
                {
                    data.scored.status && data.scored.score === 3 && (
                       <span className="text-green-700">
                           	&#10004;
                       </span>
                    )
                }
            </TableCell>
            <TableCell className="text-center border">
                {
                    data.scored.status && data.scored.score === 4 && (
                        <span className="text-green-700">
                           	&#10004;
                       </span>
                    )
                }
            </TableCell>
        </TableRow>
    )
}
