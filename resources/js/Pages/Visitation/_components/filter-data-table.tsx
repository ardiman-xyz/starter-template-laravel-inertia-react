import React from "react";
import {ClipboardEdit, ClipboardList, FileDown, MoreHorizontal, Trash2} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import {Badge} from "@/Components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {DataEmpty} from "@/Components/data-empty";

interface IProps {
    assessments: any[];
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
                            <TableRow>
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
                                <TableRow>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="flex items-center gap-x-3">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>RS</AvatarFallback>
                                        </Avatar>
                                        <p className="text-blue-800 text-sm group-hover:underline transition">
                                            Renita Setiawti, S.Pd
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-orange-600 text-white">
                                            Sedang berlangsung
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        -
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                >
                                                    <ClipboardList className="h-4 w-4 mr-2"/>
                                                    Detail
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                >
                                                    <ClipboardEdit className="h-4 w-4 mr-2"/>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                >
                                                    <FileDown className="h-4 w-4 mr-2"/>
                                                    Donwload report
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default FilterDataTable;
