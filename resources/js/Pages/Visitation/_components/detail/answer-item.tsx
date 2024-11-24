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
            <TableRow>
                <TableCell className="font-medium">
                    <div>
                        <p className="font-semibold">{component.name}</p>
                    </div>
                </TableCell>
                <TableCell>
                    {isAnswered && (
                        <div
                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            <Link2Icon className="w-4 h-4" />
                            <span>Lihat Video</span>
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

            {isAnswered && (
                <VideoModalPlayer
                    isOpen={isVideoOpen}
                    onClose={() => setIsVideoOpen(false)}
                    title={component.name}
                    url={answer?.answer!!}
                    componentId={component.id}
                />
            )}
        </>
    );
};

export default AnswerItem;
