import { Button } from "@/Components/ui/button";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Component, AssessmentAnswer } from "@/types/app";
import React, { useState } from "react";
import { AnswerStoreModal } from "./answer-store-modal";
import { Badge } from "@/Components/ui/badge";
import { AlertCircle, CalendarIcon, Link2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface AnswerItemProps {
    component: Component;
    assessmentAnswers?: AssessmentAnswer[];
    status: string;
    evaluationStatus?: {
        isEvaluated: boolean;
        score?: number;
    };
}

const AnswerItem = ({
    component,
    assessmentAnswers = [],
    status,
    evaluationStatus,
}: AnswerItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const answer = assessmentAnswers?.find(
        (answer) => Number(answer.component_id) === Number(component.id)
    );

    const isAnswered = Boolean(answer);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            {component.id === 12 && ( // Hanya tampilkan di komponen pertama
                <TableRow>
                    <TableCell colSpan={4}>
                        <div className="mb-4 space-y-4">
                            {/* Evaluation Status Alert */}
                            {!evaluationStatus?.isEvaluated && (
                                <Alert className="bg-red-50 text-red-500 border-none">
                                    <AlertCircle className="h-4 w-4 stroke-500" />
                                    <AlertDescription>
                                        Supervisi belum dievaluasi oleh kepala
                                        sekolah
                                    </AlertDescription>
                                </Alert>
                            )}
                            {evaluationStatus?.isEvaluated && (
                                <Alert variant="success">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Supervisi telah dievaluasi - Skor:{" "}
                                        {evaluationStatus.score}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </TableCell>
                </TableRow>
            )}

            <TableRow>
                <TableCell className="font-medium">
                    <div>
                        <p className="font-semibold">{component.name}</p>
                    </div>
                </TableCell>
                <TableCell>
                    {isAnswered ? (
                        <div className="flex items-center gap-2">
                            <Link2Icon className="w-4 h-4" />
                            <a
                                href={answer?.answer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Lihat Jawaban
                            </a>
                        </div>
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell>
                    {isAnswered ? (
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {answer?.created_at &&
                                formatDate(answer.created_at)}
                        </div>
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {isAnswered ? (
                            <Badge
                                variant="secondary"
                                className="capitalize bg-green-100 text-green-700"
                            >
                                Terjawab
                            </Badge>
                        ) : (
                            <Badge className="capitalize bg-red-500 rounded-sm">
                                Belum Dijawab
                            </Badge>
                        )}
                        <Button
                            variant={isAnswered ? "secondary" : "default"}
                            onClick={() => setIsOpen(true)}
                        >
                            {isAnswered ? "Edit" : "Upload"}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>

            <AnswerStoreModal
                title={component.name}
                id={component.id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialAnswer={answer?.answer ?? ""}
            />
        </>
    );
};

export default AnswerItem;
