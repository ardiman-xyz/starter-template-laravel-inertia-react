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
import { useState } from "react";

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
            thumbnail: "/images/thumb-v-yt.webp",
            youtubeId: "dQw4w9WgXcQ",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
            downloadLink: "/files/Tutorial_supervisi_ks.pdf.pdf", // Ganti dengan link PDF yang sebenarnya
        },
        {
            id: 2,
            title: "Panduan Supervisi untuk Guru",
            description:
                "Panduan bagi guru dalam mempersiapkan dan mengikuti supervisi",
            pages: 18,
            fileSize: "1.8 MB",
            thumbnail: "/api/placeholder/100/140",
            downloadLink: "/files/Tutorial supervisi_guru.pdf", // Ganti dengan link PDF yang sebenarnya
        },
    ];

    return (
        <Guest showNavbar={true}>
            <Head title="Tutorial" />

            <div className="bg-gradient-to-b from-blue-50 to-slate-50 py-8">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Tutorial Sistem Supervisi
                        </h1>
                    </div>

                    {/* Video Tutorial Section */}
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <PlayCircle className="mr-2 h-5 w-5 text-blue-600" />
                            <h2 className="text-2xl font-semibold text-slate-800">
                                Video Tutorial
                            </h2>
                        </div>

                        <div className="flex flex-col items-center">
                            {videos.map((video, index) => (
                                <Card
                                    key={video.id}
                                    className="overflow-hidden hover:shadow-md transition-shadow max-w-3xl w-full mb-6"
                                >
                                    <div className="relative p-2 rounded overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full aspect-video object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xl">
                                            {video.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {video.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="pt-0 flex flex-col gap-2">
                                        <a
                                            href={`https://youtu.be/z9kjWG_1wEI`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full"
                                        >
                                            <Button className="w-full bg-red-600 hover:bg-red-700">
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                                Tonton Video
                                            </Button>
                                        </a>
                                        <div className="flex w-full">
                                            <Input
                                                value={video.youtubeLink}
                                                readOnly
                                                className="text-xs rounded-r-none"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="rounded-l-none border-l-0"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        video.youtubeLink,
                                                        index
                                                    )
                                                }
                                            >
                                                {copiedIndex === index ? (
                                                    <span className="text-xs px-2 text-green-600">
                                                        Copied!
                                                    </span>
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
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
        </Guest>
    );
};

export default Tutorial;
