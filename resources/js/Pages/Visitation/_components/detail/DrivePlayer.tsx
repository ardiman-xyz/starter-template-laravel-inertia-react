// components/DrivePlayer.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { useState, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    FileVideo,
    Play,
    Pause,
    CheckCircle2,
    Volume2,
    VolumeX,
} from "lucide-react";
import { Slider } from "@/Components/ui/slider";
import ReactPlayer from "react-player";

interface DrivePlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
    videoId?: string;
    initialProgress?: number;
    isCompleted?: boolean;
    onProgressUpdate?: (progress: number) => void;
}

export const DrivePlayer = ({
    isOpen,
    onClose,
    url,
    title,
    videoId,
    initialProgress = 0,
    isCompleted = false,
    onProgressUpdate,
}: DrivePlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (state: {
        played: number;
        playedSeconds: number;
    }) => {
        setProgress(state.playedSeconds);
        onProgressUpdate?.(state.playedSeconds);
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const handleSeek = (value: number[]) => {
        const newTime = value[0];
        playerRef.current?.seekTo(newTime);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px]">
                <DialogHeader className="p-4 flex flex-row items-center justify-between">
                    <DialogTitle>{title}</DialogTitle>
                    {isCompleted && <Badge variant="success">Completed</Badge>}
                </DialogHeader>

                <iframe
                    src={
                        "https://drive.google.com/file/d/1Cm0Vx15q_4IZvarExVVjv8f1tnXYfLZr/view"
                    }
                    width="640"
                    height="480"
                ></iframe>

                {/* Custom Controls */}
            </DialogContent>
        </Dialog>
    );
};

export default DrivePlayer;
