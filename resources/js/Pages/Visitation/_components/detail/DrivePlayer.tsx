import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

interface DrivePlayerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

export const DrivePlayer = ({
    isOpen,
    onClose,
    url,
    title,
}: DrivePlayerProps) => {
    const getEmbedUrl = (url: string) => {
        try {
            let fileId = "";

            if (url.includes("/file/d/")) {
                fileId = url.split("/file/d/")[1].split("/")[0];
            } else if (url.includes("?id=")) {
                fileId =
                    new URLSearchParams(new URL(url).search).get("id") || "";
            }

            if (!fileId) return url;
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } catch (error) {
            console.error("Error formatting Drive URL:", error);
            return url;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[800px] p-0">
                <DialogHeader className="p-4">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="p-4">
                    <div className="relative rounded-lg overflow-hidden bg-black">
                        <div
                            className="relative"
                            style={{ paddingTop: "56.25%" }}
                        >
                            <iframe
                                src={getEmbedUrl(url)}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="autoplay"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
