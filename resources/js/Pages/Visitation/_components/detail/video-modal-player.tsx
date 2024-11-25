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
    const getStorageKey = () => {
        return `video-progress-${assessmentId}-${componentId}-${user.id}`;
    };

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
        const storageKey = getStorageKey();
        const existingProgress = localStorage.getItem(storageKey);

        const clearOldStorageKeys = () => {
            Object.keys(localStorage).forEach((key) => {
                if (
                    key.includes(`video-progress-`) &&
                    key.includes(`-${componentId}-${user.id}`) &&
                    key !== storageKey
                ) {
                    localStorage.removeItem(key);
                }
            });
        };

        clearOldStorageKeys();

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
                assessmentId,
            };

            localStorage.setItem(storageKey, JSON.stringify(initialData));
        }

        return () => {
            if (isCompleted) {
                localStorage.removeItem(storageKey);
            }
        };
    }, [componentId, initialProgress, isCompleted, assessmentId]);

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

            const storageKey = getStorageKey();
            const currentStorage = localStorage.getItem(storageKey);
            if (currentStorage) {
                const data = JSON.parse(currentStorage);
                localStorage.setItem(
                    storageKey,
                    JSON.stringify({
                        ...data,
                        lastPosition: currentTime,
                        timestamp: Date.now(),
                    })
                );
            }

            await axios.post(route("visitation.video-progress"), progressData);
            toast(`Saved`);

            if (percentage >= 99) {
                localStorage.removeItem(storageKey);
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    useEffect(() => {
        const cleanupOldStorage = () => {
            const ONE_DAY = 24 * 60 * 60 * 1000; // 24 jam dalam milliseconds

            Object.keys(localStorage).forEach((key) => {
                if (key.startsWith("video-progress-")) {
                    try {
                        const data = JSON.parse(
                            localStorage.getItem(key) || ""
                        );
                        if (Date.now() - data.timestamp > ONE_DAY) {
                            localStorage.removeItem(key);
                        }
                    } catch (e) {
                        localStorage.removeItem(key); // Hapus jika data corrupt
                    }
                }
            });
        };

        cleanupOldStorage();
    }, []);

    if (videoType === "youtube") {
        return (
            <YouTubePlayer
                isOpen={isOpen}
                onClose={onClose}
                url={url}
                title={title}
                videoId={getStorageKey()}
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
