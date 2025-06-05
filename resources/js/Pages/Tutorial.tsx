import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Copy, Download, FileText, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface VideoTutorial {
    id: number;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    youtubeId: string;
    youtubeLink: string;
}

interface PdfDocument {
    id: number;
    title: string;
    description: string;
    pages: number;
    fileSize: string;
    thumbnail: string;
    downloadLink: string;
}

const Tutorial = () => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number): void => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const videos: VideoTutorial[] = [
        {
            id: 1,
            title: "Panduan Lengkap Sistem Supervisi",
            description:
                "Tutorial lengkap penggunaan sistem supervisi dari awal hingga akhir, mencakup pendaftaran, pengaturan, penilaian, hingga pembuatan laporan.",
            duration: "12:05",
            thumbnail: "/images/thumb-v-yt2.webp",
            youtubeId: "bR_5iiH2gFE",
            youtubeLink: "https://youtu.be/bR_5iiH2gFE",
        },
    ];

    const pdfs: PdfDocument[] = [
        {
            id: 1,
            title: "Panduan Supervisi untuk Supervisor",
            description:
                "Panduan lengkap bagi supervisor dalam melakukan supervisi guru",
            pages: 24,
            fileSize: "2.5 MB",
            thumbnail: "/api/placeholder/100/140",
            downloadLink: "/files/Tutorial_supervisi_ks.pdf",
        },
        {
            id: 2,
            title: "Panduan Supervisi untuk Guru",
            description:
                "Panduan bagi guru dalam mempersiapkan dan mengikuti supervisi",
            pages: 18,
            fileSize: "1.8 MB",
            thumbnail: "/api/placeholder/100/140",
            downloadLink: "/files/Tutorial_supervisi_guru.pdf",
        },
    ];

    // Auto-play video pertama saat page load
    useEffect(() => {
        const hasSeenAutoplay = localStorage.getItem("tutorial-autoplay-seen");

        if (!hasSeenAutoplay) {
            setIsVideoPlaying(true);
            setPlayingVideoId(videos[0].id);
            localStorage.setItem("tutorial-autoplay-seen", "true");
        }
    }, []);

    const handleVideoClick = (video: VideoTutorial) => {
        if (playingVideoId === video.id) {
            setIsVideoPlaying(false);
            setPlayingVideoId(null);
        } else {
            setIsVideoPlaying(true);
            setPlayingVideoId(video.id);
        }
    };

    const getYouTubeEmbedUrl = (
        youtubeId: string,
        autoplay: boolean = false
    ) => {
        const baseUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        const params = new URLSearchParams({
            rel: "0",
            modestbranding: "1",
            showinfo: "0",
            ...(autoplay && { autoplay: "1" }),
        });
        return `${baseUrl}?${params.toString()}`;
    };

    return (
        <Guest showNavbar={true}>
            <Head title="Tutorial" />

            <div className="bg-gradient-to-b from-blue-50 to-slate-50 py-8">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Tutorial Sistem Supervisi
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Pelajari cara menggunakan sistem supervisi dengan
                            panduan video dan dokumen lengkap
                        </p>
                    </div>
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <PlayCircle className="mr-2 h-5 w-5 text-blue-600" />
                            <h2 className="text-2xl font-semibold text-slate-800">
                                Video Tutorial
                            </h2>
                        </div>

                        <div className="flex flex-col items-center wf">
                            <div className="w-full aspect-video">
                                <iframe
                                    className="w-full h-full rounded"
                                    src="http://www.youtube.com/embed/bR_5iiH2gFE?rel=0&amp;autoplay=1&mute=1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    {/* PDF Documents Section */}
                    <div>
                        <div className="flex items-center mb-6">
                            <FileText className="mr-2 h-5 w-5 text-green-600" />
                            <h2 className="text-2xl font-semibold text-slate-800">
                                Dokumen Panduan
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pdfs.map((pdf) => (
                                <Card
                                    key={pdf.id}
                                    className="hover:shadow-md transition-shadow bg-white"
                                >
                                    <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {pdf.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2 mt-1">
                                                {pdf.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="flex justify-between text-sm text-slate-500">
                                            <span>{pdf.pages} halaman</span>
                                            <span>{pdf.fileSize}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <a
                                            href={pdf.downloadLink}
                                            download
                                            className="w-full"
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full text-green-700 border-green-200 hover:bg-green-50"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Unduh PDF
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal dihapus sesuai permintaan */}
        </Guest>
    );
};

export default Tutorial;
