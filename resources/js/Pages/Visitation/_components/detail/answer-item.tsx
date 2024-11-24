import { TableCell, TableRow } from "@/Components/ui/table";
import { Component, AssessmentAnswer } from "@/types/app";
import { Badge } from "@/Components/ui/badge";
import { CalendarIcon, Link2Icon } from "lucide-react";
import { useState } from "react";
import VideoModalPlayer from "./video-modal-player";

interface AnswerItemProps {
    component: Component;
    assessmentAnswers?: AssessmentAnswer[];
    status: string;
    evaluationStatus?: {
        isEvaluated: boolean;
        score?: number;
    };
}

const AnswerItem = ({ component, assessmentAnswers = [] }: AnswerItemProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

    const answer = assessmentAnswers?.find(
        (answer) => Number(answer.component_id) === Number(component.id)
    );

    const isAnswered = Boolean(answer);

    // Dapatkan indeks komponen saat ini
    const currentIndex = assessmentAnswers.findIndex(
        (a) => Number(a.component_id) === Number(component.id)
    );

    // Periksa apakah video sebelumnya sudah selesai
    const canViewVideo =
        currentIndex === 0 || assessmentAnswers[currentIndex - 1]?.is_done;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">
                    <div>
                        <p className="font-semibold">
                            {canViewVideo ? (
                                component.name
                            ) : (
                                <span className="text-muted-foreground">
                                    {component.name}
                                </span>
                            )}
                        </p>
                    </div>
                </TableCell>
                <TableCell>
                    {isAnswered && (
                        <div className="flex flex-col items-start gap-1">
                            <div
                                className={`flex items-center gap-2 ${
                                    canViewVideo
                                        ? "cursor-pointer text-blue-600 hover:underline"
                                        : "text-gray-400"
                                }`}
                                onClick={() =>
                                    canViewVideo && setIsVideoOpen(true)
                                }
                            >
                                <Link2Icon className="w-4 h-4" />
                                <span>
                                    {canViewVideo
                                        ? "Lihat Video"
                                        : "Selesaikan Video Sebelumnya"}
                                </span>
                            </div>
                            {answer?.percentage !== undefined && (
                                <span className="text-xs text-gray-500">
                                    Progress: {answer.percentage}%
                                </span>
                            )}
                        </div>
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
                    </div>
                </TableCell>
            </TableRow>

            {isAnswered && canViewVideo && (
                <VideoModalPlayer
                    isOpen={isVideoOpen}
                    onClose={() => setIsVideoOpen(false)}
                    title={component.name}
                    url={answer?.answer!!}
                    componentId={component.id}
                    initialProgress={answer?.progress ?? 0}
                    isCompleted={answer?.is_done!!}
                />
            )}
        </>
    );
};

export default AnswerItem;
