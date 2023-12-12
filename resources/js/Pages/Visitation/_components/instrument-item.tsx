import {TableCell, TableRow} from "@/Components/ui/table";
import {Checkbox} from "@/Components/ui/checkbox";
import React, {useState} from "react";

interface IProps {
    id: number;
    title: string;
    index: number
}

const InstrumentItem = ({id, title, index}: IProps) => {


    return (
        <TableRow>
            <TableCell className="font-medium">
                {index + 1}
            </TableCell>
            <TableCell>
                {title}
            </TableCell>
            <TableCell className="text-center border">
                <input id={`default-radio-${index}`} type="radio" value="" name={`default-radio-${index}`}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </TableCell>
            <TableCell className="text-center border">
                <input id={`default-radio-${index}`} type="radio" value="" name={`default-radio-${index}`}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </TableCell>
            <TableCell className="text-center border">
                <input id={`default-radio-${index}`} type="radio" value="" name={`default-radio-${index}`}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </TableCell>
        </TableRow>
    )
}

export default InstrumentItem;
