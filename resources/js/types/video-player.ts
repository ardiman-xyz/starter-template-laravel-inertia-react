export interface VideoProgress {
    lastPosition: number;
    checkpoints: boolean[];
    isCompleted: boolean;
    timestamp: number;
}

export interface VideoPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
    videoId: string;
    onComplete?: () => void;
    onProgressUpdate?: (progress: number, checkpoints: boolean[]) => void;
    initialProgress?: number;
    isCompleted?: boolean;
}
