import {Component} from "@/types/app";
import {TableCell, TableRow} from "@/Components/ui/table";
import React, {useState} from "react";

interface TableItemProps {
    instrument: Component;
    index: number
}

type SelectedOption = {
    instrument_id: number;
    item_id: number;
    value: string;
}

export const TableItem = ({instrument, index}: TableItemProps) => {


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>, instrumentId: number, itemId: number) => {
        const newOption: SelectedOption = {
            instrument_id: instrumentId,
            item_id: itemId,
            value: e.target.value
        };

        console.info(newOption)

    };


    return (
        <>
            <TableRow>
                <TableCell className="text-center border" rowSpan={instrument.details.length + 1}>{index + 1}</TableCell>
                <TableCell className="border font-semibold text-lg">{instrument.name}</TableCell>
            </TableRow>
            {instrument.details.map((item, itemIndex) => (
                <TableRow key={itemIndex}>
                    <TableCell className="border">{`${String.fromCharCode(97 + itemIndex)}. ${item.name}`}</TableCell>
                    <TableCell className="text-center border">
                        <input type="radio" name={`item-${instrument.id}-${item.id}`} value="1" onChange={(e) => handleRadioChange(e, instrument.id, item.id)}/>
                    </TableCell>
                    <TableCell className="text-center border">
                        <input type="radio" name={`item-${instrument.id}-${item.id}`} value="2" onChange={(e) => handleRadioChange(e,  instrument.id, item.id)}/>
                    </TableCell>
                    <TableCell className="text-center border">
                        <input type="radio" name={`item-${instrument.id}-${item.id}`} value="3" onChange={(e) => handleRadioChange(e,  instrument.id, item.id)}/>
                    </TableCell>
                    <TableCell className="text-center border">
                        <input type="radio" name={`item-${instrument.id}-${item.id}`} value="4" onChange={(e) => handleRadioChange(e,  instrument.id, item.id)}/>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
