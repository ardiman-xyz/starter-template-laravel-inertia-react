import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider";
import ReactPlayer from "react-player";
import {
    Play,
    Pause,
    Volume2,
    Volume1,
    VolumeX,
    X,
    Maximize,
    Minimize,
    Forward,
    CheckCircle2,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import { useLocalStorage } from "@/Context/useLocalStorageVideoPlayer";
import { VideoProgress } from "@/types/video-player";

interface YouTubePlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
    videoId: string;
    onComplete?: () => void; // Callback when video is completed
    onProgressUpdate?: (progress: number, duration: number) => void; // Callback for progress updates
    initialProgress?: number; // Initial progress from DB
    isCompleted?: boolean; // Completion status from DB
}

export const YouTubePlayer = ({
    isOpen,
    onClose,
    url,
    title,
    onComplete,
    videoId,
    onProgressUpdate,
    initialProgress = 0,
    isCompleted = false,
}: YouTubePlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const volumeControlRef = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(isCompleted);
    const [checkpoints, setCheckpoints] = useState<boolean[]>([
        false,
        false,
        false,
        false,
    ]);
    const progressUpdateTimeout = useRef<NodeJS.Timeout>();
    const hasInitialSeek = useRef(false);

    const [savedProgress, setSavedProgress] = useLocalStorage<VideoProgress>(
        `video-progress-${videoId}`,
        {
            lastPosition: initialProgress,
            checkpoints: [false, false, false, false],
            isCompleted: isCompleted,
            timestamp: Date.now(),
        }
    );

    useEffect(() => {
        if (savedProgress && !hasInitialSeek.current) {
            setProgress(savedProgress.lastPosition);
            setCheckpoints(savedProgress.checkpoints);
            hasInitialSeek.current = true;
        }
    }, [savedProgress]);
    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    useEffect(() => {
        if (playerRef.current && initialProgress > 0) {
            playerRef.current.seekTo(initialProgress);
        }
    }, [initialProgress]);

    useEffect(() => {
        if (savedProgress && !isCompleted) {
            setProgress(savedProgress.lastPosition);
            setCheckpoints(savedProgress.checkpoints);
            if (playerRef.current) {
                playerRef.current.seekTo(savedProgress.lastPosition);
            }
        }
    }, []);

    const updateProgress = (currentTime: number, force: boolean = false) => {
        if (progressUpdateTimeout.current) {
            clearTimeout(progressUpdateTimeout.current);
        }

        progressUpdateTimeout.current = setTimeout(
            () => {
                // Save to local storage
                setSavedProgress({
                    lastPosition: currentTime,
                    checkpoints: checkpoints,
                    isCompleted: hasReachedEnd,
                    timestamp: Date.now(),
                });

                // Update server if needed
                // onProgressUpdate?.(currentTime, checkpoints);
            },
            force ? 0 : 1000
        );
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return <VolumeX className="h-5 w-5" />;
        if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
        return <Volume2 className="h-5 w-5" />;
    };

    const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const handleSeek = (value: number[]) => {
        const newTime = value[0];
        playerRef.current?.seekTo(newTime);
    };

    const togglePlay = () => {
        if (
            !isPlaying &&
            savedProgress?.lastPosition &&
            !hasInitialSeek.current
        ) {
            playerRef.current?.seekTo(savedProgress.lastPosition);
            hasInitialSeek.current = true;
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (!isOpen) {
            hasInitialSeek.current = false;
        }
    }, [isOpen]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const updateCheckpoints = (currentTime: number) => {
        const percentage = (currentTime / duration) * 100;
        const newCheckpoints = [...checkpoints];
        let updated = false;

        if (percentage >= 25 && !newCheckpoints[0]) {
            newCheckpoints[0] = true;
            updated = true;

            onProgressUpdate?.(currentTime, duration);
        }
        if (percentage >= 50 && !newCheckpoints[1]) {
            newCheckpoints[1] = true;
            updated = true;

            onProgressUpdate?.(currentTime, duration);
        }
        if (percentage >= 75 && !newCheckpoints[2]) {
            newCheckpoints[2] = true;
            updated = true;

            onProgressUpdate?.(currentTime, duration);
        }
        if (percentage >= 95 && !newCheckpoints[3]) {
            newCheckpoints[3] = true;
            updated = true;
            handleVideoComplete();
            onProgressUpdate?.(currentTime, duration);
        }

        if (updated) {
            setCheckpoints(newCheckpoints);
            updateProgress(currentTime, true);
        }
    };

    const handleVideoComplete = () => {
        if (!hasReachedEnd) {
            setHasReachedEnd(true);
            setSavedProgress((prev) => ({
                ...prev,
                isCompleted: true,
            }));
            onComplete?.();
        }
    };

    const handleProgress = (state: {
        played: number;
        playedSeconds: number;
    }) => {
        if (!hasInitialSeek.current && savedProgress?.lastPosition) {
            playerRef.current?.seekTo(savedProgress.lastPosition);
            hasInitialSeek.current = true;
            return;
        }

        setProgress(state.playedSeconds);
        updateCheckpoints(state.playedSeconds);
        updateProgress(state.playedSeconds);
    };
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (progressUpdateTimeout.current) {
                clearTimeout(progressUpdateTimeout.current);
            }
            // Force save progress on unmount
            updateProgress(progress, true);
        };
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] ">
                <DialogHeader className="p-4 flex flex-row items-center justify-between">
                    <DialogTitle>{title}</DialogTitle>
                    <div className="flex items-center gap-2">
                        {/* Checkpoint indicators */}
                        <div className="flex gap-1 mr-4">
                            {checkpoints.map((reached, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${
                                        reached ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        {hasReachedEnd ? (
                            <Badge
                                variant="success"
                                className="flex items-center gap-1"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                Completed
                            </Badge>
                        ) : (
                            <Badge variant="secondary">
                                {Math.round((progress / duration) * 100)}%
                                watched
                            </Badge>
                        )}
                    </div>
                </DialogHeader>
                <div ref={containerRef} className="relative bg-black">
                    <div className="relative" style={{ paddingTop: "56.25%" }}>
                        <div
                            className="absolute top-0 left-0 w-full h-full z-10"
                            style={{ bottom: "0px" }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                        <ReactPlayer
                            ref={playerRef}
                            url={url}
                            width="100%"
                            height="100%"
                            playing={isPlaying}
                            volume={volume}
                            muted={isMuted}
                            playbackRate={playbackRate}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                            style={{ position: "absolute", top: 0, left: 0 }}
                            config={{
                                youtube: {
                                    playerVars: {
                                        modestbranding: 1,
                                        rel: 0,
                                        controls: 0,
                                        iv_load_policy: 3,
                                        showinfo: 0,
                                        disablekb: 1, // Disable keyboard controls
                                        fs: 0, // Disable fullscreen
                                        playsinline: 1, // Force inline playing
                                        preventFullscreen: true,
                                        origin: window.location.origin,
                                    },
                                },
                            }}
                            onPlay={() => {
                                if (!isPlaying) {
                                    playerRef.current?.seekTo(progress);
                                    setIsPlaying(false);
                                }
                            }}
                            onClick={() => {
                                // Prevent click on video
                                return false;
                            }}
                        />
                    </div>

                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full text-white text-sm z-20">
                        {formatTime(progress)} / {formatTime(duration)}
                    </div>

                    {/* Custom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 z-20">
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <Slider
                                value={[progress]}
                                max={duration}
                                step={1}
                                onValueChange={handleSeek}
                                className="cursor-pointer"
                            />
                            <div className="flex justify-between text-white text-sm mt-1">
                                <span>{formatTime(progress)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    className="text-white hover:bg-white/20 h-12 w-12 p-2"
                                    onClick={togglePlay}
                                >
                                    {isPlaying ? (
                                        <Pause className="h-8 w-8" />
                                    ) : (
                                        <Play className="h-8 w-8" />
                                    )}
                                </Button>

                                {/* Volume Control */}
                                <div
                                    ref={volumeControlRef}
                                    className="relative"
                                >
                                    <Button
                                        variant="ghost"
                                        className="text-white hover:bg-white/20 h-12 w-12 p-2"
                                        onClick={() =>
                                            setShowVolumeControl(
                                                !showVolumeControl
                                            )
                                        }
                                    >
                                        {getVolumeIcon()}
                                    </Button>

                                    {showVolumeControl && (
                                        <div className="absolute bottom-full left-0 mb-2 bg-black/90 rounded-lg p-4 min-w-[200px]">
                                            <div className="flex items-center gap-4">
                                                <VolumeX className="h-4 w-4 text-white" />
                                                <Slider
                                                    value={[volume]}
                                                    max={1}
                                                    step={0.01}
                                                    onValueChange={
                                                        handleVolumeChange
                                                    }
                                                    className="w-32"
                                                />
                                                <Volume2 className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Speed Control */}
                                <Select
                                    value={playbackRate.toString()}
                                    onValueChange={(value) =>
                                        setPlaybackRate(parseFloat(value))
                                    }
                                >
                                    <SelectTrigger className="w-[100px] bg-transparent text-white border-white/20">
                                        <Forward className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Speed" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0.5">
                                            0.5x
                                        </SelectItem>
                                        <SelectItem value="1">
                                            1x{" "}
                                            <span className="text-muted-foreground">
                                                (normal)
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="1.5">
                                            1.5x
                                        </SelectItem>
                                        <SelectItem value="2">2x</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                variant="ghost"
                                className="text-white hover:bg-white/20 h-12 w-12 p-2"
                                onClick={toggleFullscreen}
                            >
                                {isFullscreen ? (
                                    <Minimize className="h-7 w-7" />
                                ) : (
                                    <Maximize className="h-7 w-7" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
