import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {AlertCircle, ChevronDown} from "lucide-react";

import {AssessmentAnswer} from "@/types/app";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {Hint} from "@/Components/Hint";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import {formatDate} from "@/helper";
import {AnswerStoreModal} from "./answer-store-modal";
import {Badge} from "@/Components/ui/badge";

interface AnswerProps {
    startedAt: string;
    finishedAt: string;
    defaultData?: AssessmentAnswer;
    status: string;
}

export const Answer = ({ startedAt, finishedAt, defaultData, status }: AnswerProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="flex justify-between bg-gray-100 rounded border-t-2 border-sky-700 p-4">
                <Heading
                    title={`Tanggapan Guru`}
                    description={`Silakan upload link video anda`}
                />
                <Hint description={isOpen ? "Close section": "Open section"} >
                    <ChevronDown onClick={handleClick} className={`transition-transform duration-500 ${isOpen ? "" : "transform -rotate-90"}`} />
                </Hint>
            </div>

            <div className={cn(" transition-all duration-500", !isOpen && "hidden")}>

                {
                   !defaultData?.answer && (
                        <Alert className="mt-4 bg-yellow-100 border border-yellow-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Pemberitahuan!</AlertTitle>
                            <AlertDescription>
                                Anda belum mengupload link, klik upload sekarang untuk
                            </AlertDescription>
                        </Alert>
                    )
                }

                <Table className={"border mt-3"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Jadwal</TableHead>
                            <TableHead>Link video</TableHead>
                            <TableHead>Tanggal submit</TableHead>
                            <TableHead>
                                {status === "schedule" ? "Aksi" : "Status visitasi"}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="w-[300px]">
                                <span className="font-sans font-semibold"
                                      >
                                        {formatDate(startedAt)}
                                                <span className="text-orange-700 mx-3">
                                            s/d
                                          </span>
                                    {formatDate(finishedAt)}
                                    </span>
                            </TableCell>
                            <TableCell>
                                {
                                    defaultData === null && "-"
                                }

                                <Hint description={"Klik untuk lihat"}>
                                   <a href={defaultData?.answer} target="_blank" className="underline cursor-pointer text-blue-800">
                                        {
                                            defaultData?.answer
                                        }
                                   </a>
                                </Hint>
                            </TableCell>
                            <TableCell>
                                {
                                    defaultData?.created_at === null || defaultData?.created_at === undefined ? "-" : formatDate(defaultData?.created_at)
                                }


                            </TableCell>
                            <TableCell>
                                {
                                    status === "schedule" ? (
                                        <AnswerStoreModal
                                            defaultData={{
                                                link : defaultData?.answer
                                            }}
                                            alreadyAnswer={ defaultData?.answer !== null }
                                        />
                                    ): (
                                        <Badge className="bg-green-600 text-white">
                                            Selesai
                                        </Badge>
                                    )
                                }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
