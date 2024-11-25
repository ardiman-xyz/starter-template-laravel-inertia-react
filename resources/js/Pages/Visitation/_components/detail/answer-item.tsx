import axios from "axios";
import { CalendarIcon, Link2Icon } from "lucide-react";

import { TableCell, TableRow } from "@/Components/ui/table";
import { Component, AssessmentAnswer, User } from "@/types/app";
import useVisitationContextNew from "@/Context/useVisitationContextNew";

import { Badge } from "@/Components/ui/badge";
import { useMemo, useState } from "react";
import VideoModalPlayer from "./video-modal-player";

interface AnswerItemProps {
    component: Component;
    assessmentAnswers?: AssessmentAnswer[];
    status: string;
    evaluationStatus?: {
        isEvaluated: boolean;
        score?: number;
    };
    user: User;
}

const AnswerItem = ({
    component,
    assessmentAnswers = [],
    user,
}: AnswerItemProps) => {
    const { assessmentId } = useVisitationContextNew();

    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

    const answer = assessmentAnswers?.find(
        (answer) => Number(answer.component_id) === Number(component.id)
    );

    const isAnswered = Boolean(answer);

    const currentIndex = assessmentAnswers.findIndex(
        (a) => Number(a.component_id) === Number(component.id)
    );

    const canViewVideo =
        currentIndex === 0 || assessmentAnswers[currentIndex - 1]?.is_done;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const url = answer?.answer!!;

    const videoType = useMemo(() => {
        if (url) {
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                return "youtube";
            }
            if (url.includes("drive.google.com")) {
                return "drive";
            }
            return "unknown";
        }
    }, [url]);

    const handleViewDrive = async () => {
        const progressData = {
            assessmentId,
            componentId: component.id,
            progress: 0,
            percentage: 100,
            checkpoint: 4,
        };

        try {
            await axios.post(route("visitation.video-progress"), progressData);

            window.open(url, "_blank");
        } catch (error) {
            console.error("Failed to update progress:", error);
            alert("Gagal mengupdate progress. Silakan coba lagi.");
        }
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
                            {videoType === "drive" ? (
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Link2Icon className="w-4 h-4" />
                                    <div
                                        onClick={handleViewDrive}
                                        className="cursor-pointer text-blue-600 hover:underline"
                                    >
                                        Link video
                                    </div>
                                </div>
                            ) : (
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
                            )}

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
                    user={user}
                />
            )}
        </>
    );
};

export default AnswerItem;
