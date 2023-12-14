import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

import {DataEmpty} from "@/Components/data-empty";
import {Assessment} from "@/types/app";
import FilterDataItem from "@/Pages/Visitation/_components/filter-data-item";

interface IProps {
    assessments: Assessment[];
}

const FilterDataTable = ({assessments}: IProps) => {

    return (
        <div>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Guru</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Nilai</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        assessments.length < 1 && (
                            <TableRow >
                                <TableCell colSpan={5} >
                                    <div className="font-medium text-center flex items-center justify-center my-10">
                                        <DataEmpty />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }

                    {
                        assessments.length > 0 && (
                            assessments.map((assessment, index) => (
                                <FilterDataItem
                                    assessment={assessment}
                                    index={index}
                                />
                            ))
                        )
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default FilterDataTable;
