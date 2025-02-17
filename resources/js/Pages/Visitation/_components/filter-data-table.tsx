import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { DataEmpty } from "@/Components/data-empty";
import { Assessment } from "@/types/app";
import FilterDataItem from "@/Pages/Visitation/_components/filter-data-item";
import { useSupervisionStore } from "@/Context/useSupervisionStore";

interface IProps {
    assessments: Assessment[];
}

const FilterDataTable = ({ assessments }: IProps) => {
    const { toggleAll, selectedItems } = useSupervisionStore();

    const handleToggleAll = () => {
        toggleAll(assessments.map((assessment) => assessment.id));
    };

    const allSelected =
        assessments.length > 0 &&
        assessments.every((assessment) =>
            selectedItems.includes(assessment.id)
        );

    return (
        <div>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[10px]">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={allSelected}
                                onChange={handleToggleAll}
                            />
                        </TableHead>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Guru</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Nilai</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assessments.length < 1 && (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <div className="font-medium text-center flex items-center justify-center my-10">
                                    <DataEmpty />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {assessments.length > 0 &&
                        assessments.map((assessment, index) => (
                            <FilterDataItem
                                assessment={assessment}
                                index={index}
                                key={index}
                            />
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default FilterDataTable;
