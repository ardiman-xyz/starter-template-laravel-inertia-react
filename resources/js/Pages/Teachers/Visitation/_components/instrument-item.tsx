import React from "react";

import {Component} from "@/types/app";
import {TableCell, TableRow} from "@/Components/ui/table";
import {InstrumentItemDetail} from "./instrument-item-detail";


interface IProps {
    instrument: Component;
    index: number
}


export const InstrumentItem = ({instrument, index}: IProps) => {
    return (
        <>
        <TableRow>
            <TableCell className="text-center border" rowSpan={instrument.details.length + 1}>{index + 1}</TableCell>
            <TableCell className="border font-semibold text-lg">{instrument.name}</TableCell>
        </TableRow>
            {instrument.details.map((item, itemIndex) => (
                <InstrumentItemDetail
                    index={itemIndex}
                    key={itemIndex}
                    data={item}
                    instrument={instrument}
                />
            ))}
        </>
    )
}
