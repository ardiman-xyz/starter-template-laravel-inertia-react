import React, {useState} from "react";
import {ClipboardEdit, ClipboardList, FileDown, MoreHorizontal, Trash2} from "lucide-react";
import {Link, router} from "@inertiajs/react";

import {Assessment} from "@/types/app";
import {TableCell, TableRow} from "@/Components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {getFirstTwoLettersOfLastName} from "@/helper";
import {Badge} from "@/Components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import {DeleteAction} from "@/Pages/Visitation/_components/delete-action";

interface IProps {
    assessment: Assessment;
    index: number;
}

const FilterDataItem = ({assessment, index}: IProps) => {

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    return(
        <>
            <TableRow key={index} className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="flex items-center gap-x-3">
                    <Avatar className="w-6 h-6">
                        <AvatarImage />
                        <AvatarFallback>
                            {
                                getFirstTwoLettersOfLastName(assessment.teacher.name)
                            }
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-blue-800 text-sm group-hover:underline transition">
                        {
                            assessment.teacher.name
                        }
                    </p>
                </TableCell>
                <TableCell>
                    {
                        assessment.status === "schedule"  ? (
                            <Badge className="bg-orange-600 text-white">
                                Sedang berlangsung
                            </Badge>
                        ): (
                            <Badge className="bg-green-600 text-white">
                                Selesai
                            </Badge>
                        )
                    }
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
                            <Link href={route("visitation.detail", assessment.id)} >
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                >
                                    <ClipboardList className="h-4 w-4 mr-2"/>
                                    Detail
                                </DropdownMenuItem>
                            </Link>
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
                                onClick={() => setIsModalDeleteOpen(true)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

            {
                isModalDeleteOpen && (
                    <DeleteAction
                        id={assessment.id}
                        teacher_name={assessment.teacher.name}
                        onClose={() => setIsModalDeleteOpen(false)}
                    />
                )
            }
        </>
    )
}

export default FilterDataItem;
