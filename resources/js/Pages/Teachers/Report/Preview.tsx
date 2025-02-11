import Guest from "@/Layouts/GuestLayout";
import React from "react";
import { format } from "date-fns";
import { Award, Calendar, FileDown, School, User } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

const dummyData = {
    teacher: {
        name: "Fenrir Dongkak, S.Pd",
        email: "fenrir.dongkak@gmail.com",
    },
    school: {
        name: "SMA N 14 KONSEL",
    },
    date: "2025-02-12",
    score: {
        total: 82,
        percentage: 94,
        category: "Baik Sekali",
    },
    components: [
        {
            name: "Kegiatan Pendahuluan",
            score: 15,
            maxScore: 16,
            details: [
                {
                    name: "Menyiapkan peserta didik secara fisik dan psikis",
                    score: 4,
                    maxScore: 4,
                },
                {
                    name: "Menyampaikan rencana kegiatan dan tujuan",
                    score: 3,
                    maxScore: 4,
                },
                {
                    name: "Melakukan apersepsi dan demonstrasi",
                    score: 4,
                    maxScore: 4,
                },
                {
                    name: "Penampilan guru",
                    score: 4,
                    maxScore: 4,
                },
            ],
        },
        {
            name: "Kegiatan Inti",
            score: 58,
            maxScore: 60,
            details: [
                {
                    name: "Penguasaan materi pelajaran",
                    score: 4,
                    maxScore: 4,
                },
                {
                    name: "Kesesuaian materi dengan tujuan",
                    score: 4,
                    maxScore: 4,
                },
                {
                    name: "Mengaitkan materi dengan kehidupan nyata",
                    score: 3,
                    maxScore: 4,
                },
                {
                    name: "Penyajian materi secara sistematis",
                    score: 4,
                    maxScore: 4,
                },
            ],
        },
        {
            name: "Kegiatan Penutup",
            score: 11,
            maxScore: 12,
            details: [
                {
                    name: "Melakukan refleksi pembelajaran",
                    score: 4,
                    maxScore: 4,
                },
                {
                    name: "Memberikan umpan balik",
                    score: 3,
                    maxScore: 4,
                },
                {
                    name: "Merencanakan tindak lanjut",
                    score: 4,
                    maxScore: 4,
                },
            ],
        },
    ],
    findings:
        "Guru menunjukkan performa yang sangat baik dalam pengelolaan kelas dan penyampaian materi. Interaksi dengan siswa terjalin dengan baik dan penggunaan media pembelajaran sangat efektif. Beberapa siswa terlihat sangat antusias dalam mengikuti pembelajaran.",
    followUp:
        "Pertahankan metode pembelajaran yang interaktif dan penggunaan media yang beragam. Untuk pengembangan selanjutnya, bisa ditambahkan variasi dalam metode evaluasi pembelajaran dan penerapan teknologi pembelajaran yang lebih mutakhir.",
};

const Preview = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Guest>
            <Head title="Laporan Supervisi" />

            <div className="container mx-auto py-6 max-w-[210mm] bg-white">
                <Card className="border-none shadow-none">
                    <CardHeader className="flex flex-row justify-between items-center px-8 pt-6 pb-4">
                        <CardTitle className="text-2xl">
                            Laporan Supervisi
                        </CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            className="print:hidden"
                            onClick={handlePrint}
                        >
                            <FileDown className="mr-2 h-4 w-4" />
                            Unduh Laporan
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-6 px-8">
                        {/* Info Header */}
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="py-1 w-32">Nama Guru</td>
                                    <td>: Fenrir Dongkak, S.Pd</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Email</td>
                                    <td>: fenrir.dongkak@gmail.com</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Sekolah</td>
                                    <td>: SMA N 14 KONSEL</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Tanggal</td>
                                    <td>: 12 Februari 2025</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Hasil</td>
                                    <td>: 94% (Baik Sekali)</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Tabel Penilaian */}
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Komponen</th>
                                    <th className="text-right w-20">Skor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 font-medium">
                                        A. Kegiatan Pendahuluan
                                    </td>
                                    <td className="text-right">15/16</td>
                                </tr>
                                <tr>
                                    <td className="py-1 pl-4">
                                        1. Menyiapkan peserta didik
                                    </td>
                                    <td className="text-right">4/4</td>
                                </tr>
                                <tr>
                                    <td className="py-1 pl-4">
                                        2. Menyampaikan rencana kegiatan
                                    </td>
                                    <td className="text-right">3/4</td>
                                </tr>
                                <tr>
                                    <td className="py-1 pl-4">
                                        3. Melakukan apersepsi
                                    </td>
                                    <td className="text-right">4/4</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-1 pl-4">
                                        4. Penampilan guru
                                    </td>
                                    <td className="text-right">4/4</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 font-medium">
                                        B. Kegiatan Inti
                                    </td>
                                    <td className="text-right">58/60</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 font-medium">
                                        C. Kegiatan Penutup
                                    </td>
                                    <td className="text-right">11/12</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Temuan dan Tindak Lanjut dalam tabel */}
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="pt-2 pb-1 font-medium">
                                        Temuan:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 text-sm">
                                        Guru menunjukkan performa yang sangat
                                        baik dalam pengelolaan kelas dan
                                        penyampaian materi. Interaksi dengan
                                        siswa terjalin dengan baik dan
                                        penggunaan media pembelajaran sangat
                                        efektif.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pt-2 pb-1 font-medium">
                                        Tindak Lanjut:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 text-sm">
                                        Pertahankan metode pembelajaran yang
                                        interaktif dan penggunaan media yang
                                        beragam. Untuk pengembangan selanjutnya,
                                        bisa ditambahkan variasi dalam metode
                                        evaluasi pembelajaran.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </Guest>
    );
};

export default Preview;
