import React, { useState } from "react";
import { ClipboardList, FileDown, MoreHorizontal, Trash2 } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";

import { Assessment } from "@/types/app";
import { TableCell, TableHead, TableRow } from "@/Components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { formatDate, getFirstTwoLettersOfLastName } from "@/helper";
import { Badge } from "@/Components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { DeleteAction } from "@/Pages/Visitation/_components/delete-action";
import { SharedInertiaData } from "@/types/inertia";
import { Hint } from "@/Components/Hint";
import { SettingDateModal } from "@/Pages/Visitation/_components/modal/setting-date-modal";

interface IProps {
    assessment: Assessment;
    index: number;
}

const FilterDataItem = ({ assessment, index }: IProps) => {
    const { ziggy } = usePage<SharedInertiaData>().props;

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalDateOpen, setIsModalDateOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="flex items-center gap-x-3">
                    <Avatar className="w-6 h-6">
                        {assessment.teacher.profile_picture !== null && (
                            <AvatarImage
                                src={
                                    ziggy?.url +
                                    "/storage/" +
                                    assessment.teacher?.profile_picture
                                }
                            />
                        )}
                        <AvatarFallback>
                            {getFirstTwoLettersOfLastName(
                                assessment.teacher.name
                            )}
                        </AvatarFallback>
                    </Avatar>
                    <Hint description="Klik untuk lihat detail">
                        <span
                            className="underline text-blue-900"
                            onClick={() =>
                                router.visit(
                                    route("visitation.detail", assessment.id)
                                )
                            }
                        >
                            {assessment.teacher.name}
                        </span>
                    </Hint>
                </TableCell>
                <TableHead>
                    {assessment.status === "schedule" && (
                        <Hint description="Klik untuk ubah tanggal">
                            <span
                                className="font-sans underline text-gray-800"
                                onClick={() => setIsModalDateOpen(true)}
                            >
                                {formatDate(assessment.started_at)}
                                <span className="text-orange-800 mx-3">
                                    s/d
                                </span>
                                {formatDate(assessment.finished_at)}
                            </span>
                        </Hint>
                    )}
                    {assessment.status === "finish" && (
                        <span className="font-sans text-gray-600">
                            {formatDate(assessment.started_at)}
                            <span className="mx-3">s/d</span>
                            {formatDate(assessment.finished_at)}
                        </span>
                    )}
                </TableHead>
                <TableCell>
                    {assessment.status === "schedule" ? (
                        <Badge className="bg-orange-600 text-white">
                            Dijadwalkan
                        </Badge>
                    ) : (
                        <Badge className="bg-green-600 text-white">
                            Selesai
                        </Badge>
                    )}
                </TableCell>
                <TableCell className="text-center">
                    <span>
                        {assessment.final_score.final_score}%{" "}
                        <Badge className="text-black ml-1 bg-gray-300 hover:bg-gray-400">
                            {assessment.final_score.evaluate}
                        </Badge>
                    </span>
                </TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link
                                href={route("visitation.detail", assessment.id)}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Detail
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer">
                                <FileDown className="h-4 w-4 mr-2" />
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

            {isModalDeleteOpen && (
                <DeleteAction
                    id={assessment.id}
                    teacher_name={assessment.teacher.name}
                    onClose={() => setIsModalDeleteOpen(false)}
                />
            )}
            {isModalDateOpen && (
                <SettingDateModal
                    onClose={() => setIsModalDateOpen(false)}
                    id={assessment.id}
                    name={assessment.teacher.name}
                    defaultData={{
                        startedAt: assessment.started_at,
                        finishedAt: assessment.finished_at,
                    }}
                />
            )}
        </>
    );
};

export default FilterDataItem;
