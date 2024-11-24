import { useMemo, useState } from "react";
import { YouTubePlayer } from "./YouTubePlayer";
import { DrivePlayer } from "./DrivePlayer";
import axios from "axios";
import useVisitationContextNew from "@/Context/useVisitationContextNew";
import { toast } from "sonner";

interface VideoPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
    componentId: number;
}

const VideoPlayer = ({
    isOpen,
    onClose,
    url,
    title,
    componentId,
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

    const handleUpdate = async (currentTime: number, videoDuration: number) => {
        try {
            const percentage = (currentTime / videoDuration) * 100;

            const progressData = {
                assessmentId,
                componentId,
                progress: currentTime,
                percentage: Math.round(percentage),
                checkpoint:
                    percentage >= 95
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
            toast.success(`Saved ${Math.round(percentage)}%`);
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
                videoId="unique-video-id-yt"
                onProgressUpdate={handleUpdate}
            />
        );
    }

    if (videoType === "drive") {
        return (
            <DrivePlayer
                isOpen={isOpen}
                onClose={onClose}
                url={url}
                title={title}
            />
        );
    }

    return null;
};

export default VideoPlayer;
