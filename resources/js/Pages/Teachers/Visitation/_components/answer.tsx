import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, ChevronDown } from "lucide-react";

import {
    Assessment,
    AssessmentAnswer,
    Component,
    Instrument,
} from "@/types/app";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Hint } from "@/Components/Hint";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { formatDate } from "@/helper";
import { AnswerStoreModal } from "./answer-store-modal";
import { Badge } from "@/Components/ui/badge";
import AnswerItem from "./answer-item";

interface AnswerProps {
    status: string;
    instruments: Component[];
    assessmentAnswers: AssessmentAnswer[];
}

export const Answer = ({ instruments, assessmentAnswers }: AnswerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between bg-gray-100 rounded border-t-2 border-sky-700 p-4">
                <Heading
                    title={`Tanggapan Guru`}
                    description={`Silakan upload link video anda`}
                />
                <Hint description={isOpen ? "Close section" : "Open section"}>
                    <ChevronDown
                        onClick={handleClick}
                        className={`transition-transform duration-500 ${
                            isOpen ? "" : "transform -rotate-90"
                        }`}
                    />
                </Hint>
            </div>

            <div
                className={cn(
                    " transition-all duration-500",
                    !isOpen && "hidden"
                )}
            >
                {/* {!defaultData?.answer && (
                    <Alert className="mt-4 bg-yellow-100 border border-yellow-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Pemberitahuan!</AlertTitle>
                        <AlertDescription>
                            Anda belum mengupload link
                        </AlertDescription>
                    </Alert>
                )} */}

                <Table className={"border mt-3"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Video</TableHead>
                            <TableHead>Tanggal Submit</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instruments.map((instrument) => (
                            <AnswerItem
                                key={instrument.id}
                                component={instrument}
                                assessmentAnswers={assessmentAnswers}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
