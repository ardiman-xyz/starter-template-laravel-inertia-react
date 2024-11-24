export const getYouTubeId = (url: string): string => {
    try {
        if (url.includes("youtu.be")) {
            return url.split("/").pop() || "";
        }
        if (url.includes("youtube.com")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            return urlParams.get("v") || "";
        }
        return "";
    } catch (error) {
        console.error("Error extracting YouTube ID:", error);
        return "";
    }
};

export const convertDriveUrl = (url: string): string => {
    try {
        let fileId = "";

        if (url.includes("/file/d/")) {
            fileId = url.split("/file/d/")[1].split("/")[0];
        } else if (url.includes("?id=")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            fileId = urlParams.get("id") || "";
        }

        if (!fileId) return url;
        return `https://drive.google.com/file/d/${fileId}/preview`;
    } catch (error) {
        console.error("Error converting Drive URL:", error);
        return url;
    }
};
