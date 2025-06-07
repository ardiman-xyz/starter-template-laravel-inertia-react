import Guest from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {
    Info,
    Users,
    FileText,
    BarChart,
    ClipboardCheck,
    AreaChart,
} from "lucide-react";

const Welcome = () => {
    const features = [
        {
            icon: <ClipboardCheck className="h-6 w-6" />,
            title: "Penilaian Terstandar",
            description:
                "Sistem evaluasi objektif berdasarkan kriteria pendidikan nasional.",
            color: "bg-blue-50 text-blue-700 border-blue-200",
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Bimbingan Kolaboratif",
            description:
                "Diskusi dan umpan balik antara supervisor dan guru untuk perbaikan berkelanjutan.",
            color: "bg-violet-50 text-violet-700 border-violet-200",
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Dokumentasi Digital",
            description:
                "Laporan kemajuan dan riwayat supervisi tersimpan secara digital dan mudah diakses.",
            color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
            icon: <AreaChart className="h-6 w-6" />,
            title: "Analisis Performa",
            description:
                "Visualisasi data untuk memahami tren dan area pengembangan.",
            color: "bg-amber-50 text-amber-700 border-amber-200",
        },
    ];

    return (
        <Guest>
            <Head title="Home" />

            <div className="">
                <div className="container  max-w-6xl bg-white">
                    <img src="/images/Supervisi.png" alt="Banner" />
                </div>
            </div>

            {/* Flow Section */}
            <div className="bg-white">
                <div className="container px-4 md:px-6 py-10 max-w-6xl">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Tahapan Kerja Sistem Supervisi
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Proses supervisi yang terstruktur dan efisien
                        </p>
                    </div>

                    <Tabs defaultValue="supervisor" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-100">
                            <TabsTrigger
                                value="supervisor"
                                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                            >
                                Alur Supervisor
                            </TabsTrigger>
                            <TabsTrigger
                                value="guru"
                                className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                            >
                                Alur Guru
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="supervisor">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    {
                                        title: "Persiapan Awal",
                                        steps: [
                                            "Registrasi & Isi Data",
                                            "Tambah Data Guru",
                                            "Kirim Invite Link",
                                        ],
                                        color: "bg-blue-50 border-blue-100",
                                    },
                                    {
                                        title: "Pengaturan Sistem",
                                        steps: [
                                            "Atur Tahun & Semester",
                                            "Siapkan Instrumen",
                                        ],
                                        color: "bg-indigo-50 border-indigo-100",
                                    },
                                    {
                                        title: "Proses Supervisi",
                                        steps: [
                                            "Buat Jadwal",
                                            "Tonton Video",
                                            "Berikan Penilaian",
                                        ],
                                        color: "bg-violet-50 border-violet-100",
                                    },
                                    {
                                        title: "Analisis & Laporan",
                                        steps: ["Lihat Hasil", "Unduh Laporan"],
                                        color: "bg-purple-50 border-purple-100",
                                    },
                                ].map((section, index) => (
                                    <Card
                                        key={index}
                                        className={`${section.color}`}
                                    >
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base text-slate-800">
                                                {section.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-1">
                                                {section.steps.map(
                                                    (step, stepIndex) => (
                                                        <li
                                                            key={stepIndex}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                                                                {stepIndex + 1}
                                                            </div>
                                                            <span className="text-sm text-slate-600">
                                                                {step}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="guru">
                            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                                {[
                                    "Terima Undangan",
                                    "Aktivasi Akun",
                                    "Login Sistem",
                                    "Cek Jadwal",
                                    "Upload Video",
                                    "Tunggu Penilaian",
                                    "Lihat Hasil",
                                ].map((step, index) => (
                                    <Card
                                        key={index}
                                        className="flex flex-col items-center text-center p-4 bg-green-50 border-green-100"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium mb-2">
                                            {index + 1}
                                        </div>
                                        <span className="text-sm text-slate-600">
                                            {step}
                                        </span>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Features */}
            <div className="container px-4 md:px-6 py-10 bg-slate-50 max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                        Fitur Utama
                    </h2>
                    <p className="text-slate-500 mt-2">
                        Dirancang untuk supervisi yang efektif
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={`${feature.color} border transition-all hover:shadow-md`}
                        >
                            <CardHeader className="pb-2">
                                <div className="mb-2">{feature.icon}</div>
                                <CardTitle className="text-xl">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-slate-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-t from-blue-50 to-white">
                <div className="container px-4 md:px-6 py-10  max-w-6xl">
                    <Alert className="border-blue-200 bg-blue-50">
                        <AlertTitle className="text-lg font-semibold text-blue-800">
                            Siap untuk meningkatkan proses supervisi?
                        </AlertTitle>
                        <AlertDescription className="flex flex-col sm:flex-row gap-4 mt-3 items-start sm:items-center">
                            <span className="text-slate-600">
                                Mulai gunakan sistem supervisi digital hari ini.
                            </span>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => router.get("/auth")}
                                >
                                    Daftar Akun
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                    onClick={() => router.get("/tutorial")}
                                >
                                    Lihat Tutorial
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </Guest>
    );
};

export default Welcome;
