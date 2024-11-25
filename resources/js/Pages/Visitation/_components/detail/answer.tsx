import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import { Assessment, AssessmentAnswer, Component } from "@/types/app";

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
import AnswerItem from "./answer-item";

interface AnswerProps {
    status: string;
    instruments: Component[];
    assessmentAnswers: AssessmentAnswer[];
    assessment: Assessment;
}
export const Answer = ({
    instruments,
    assessmentAnswers,
    status,
    assessment,
}: AnswerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="flex justify-between bg-gray-100 rounded border-t-2 border-sky-700 p-4">
                <Heading
                    title={`Jawaban guru`}
                    description={`Silakan lihat video dan berikan nilai anda.`}
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
                                status={status}
                                evaluationStatus={{
                                    isEvaluated: Boolean(
                                        assessment.final_score
                                    ),
                                    score: Number(assessment.final_score),
                                }}
                                user={assessment.teacher}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
