import { useEffect, useMemo, useState } from "react";
import { YouTubePlayer } from "./YouTubePlayer";
import axios from "axios";
import useVisitationContextNew from "@/Context/useVisitationContextNew";
import { toast } from "sonner";
import { User } from "@/types/app";

interface VideoPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
    componentId: number;
    initialProgress: number;
    isCompleted: boolean;
    user: User;
}

const VideoPlayer = ({
    isOpen,
    onClose,
    url,
    title,
    componentId,
    initialProgress,
    isCompleted,
    user,
}: VideoPlayerProps) => {
    const { assessmentId } = useVisitationContextNew();

    const videoType = useMemo(() => {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        }
        if (url.includes("drive.google.com")) {
            return "drive";
        }
        return "unknown";
    }, [url]);

    useEffect(() => {
        const storageKey = `video-progress-${componentId}-${user.id}`;
        const existingProgress = localStorage.getItem(storageKey);

        if (!existingProgress && initialProgress > 0) {
            const initialData = {
                lastPosition: initialProgress,
                checkpoints: [
                    initialProgress >= 25,
                    initialProgress >= 50,
                    initialProgress >= 75,
                    initialProgress >= 99,
                ],
                isCompleted: isCompleted,
                timestamp: Date.now(),
            };

            localStorage.setItem(storageKey, JSON.stringify(initialData));
        }
    }, [componentId, initialProgress, isCompleted]);

    const handleUpdate = async (currentTime: number, videoDuration: number) => {
        try {
            const percentage = (currentTime / videoDuration) * 100;

            const progressData = {
                assessmentId,
                componentId,
                progress: currentTime,
                percentage: Math.round(percentage),
                checkpoint:
                    percentage >= 99
                        ? 4
                        : percentage >= 75
                        ? 3
                        : percentage >= 50
                        ? 2
                        : percentage >= 25
                        ? 1
                        : 0,
            };

            await axios.post(route("visitation.video-progress"), progressData);
            toast(`Saved`);
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    if (videoType === "youtube") {
        return (
            <YouTubePlayer
                isOpen={isOpen}
                onClose={onClose}
                url={url}
                title={title}
                videoId={`video-progress-${componentId}-${user.id}`}
                initialProgress={initialProgress}
                isCompleted={isCompleted}
                onProgressUpdate={handleUpdate}
            />
        );
    }

    // if (videoType === "drive") {
    //     return <a href={url} target="blank"></a>;
    // }

    return null;
};

export default VideoPlayer;
