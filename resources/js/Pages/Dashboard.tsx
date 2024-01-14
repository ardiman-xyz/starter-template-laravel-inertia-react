import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import VisitationChart from "@/Pages/_components/visitation-chart";
import { LibraryBig } from "lucide-react";

export default function Dashboard({ auth }: PageProps) {
    const visitationsData = [
        {
            academic_year: "2023",
            semester: "1",
            teacher_id: "1",
            teacher_name: "Teacher 1",
            total_visitation: "5",
            average_assessment_score: "85",
        },
        {
            academic_year: "2023",
            semester: "2",
            teacher_id: "1",
            teacher_name: "Teacher 1",
            total_visitation: "7",
            average_assessment_score: "88",
        },
        {
            academic_year: "2023",
            semester: "1",
            teacher_id: "2",
            teacher_name: "Teacher 2",
            total_visitation: "6",
            average_assessment_score: "90",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="container mx-auto max-w-screen-2xl flex overflow-hidden md:flex-row flex-col">
                <div className="w-full ">
                    <div className="rounded bg-gradient-to-r from-sky-100 to-sky-50 py-6 px-8 border border-sky-100 mb-10 flex justify-between relative overflow-hidden">
                        <div className="md:w-1/2 w-full">
                            <h1 className="text-xl font-bold text-sky-800">
                                SMAN 15 KONSEL
                            </h1>
                            <p className="text-sm font-albert text-gray-700">
                                Selamat datang admin, di aplikasi{" "}
                                <span className="font-semibold">
                                    sispeng-tk.id
                                </span>
                                .
                            </p>
                        </div>
                        <div className="absolute md:flex hidden -top-3 right-10">
                            <img
                                src="/images/teacher.png"
                                alt="gambar"
                                className="h-[180px] w-[180px]"
                            />
                        </div>
                    </div>

                    <VisitationChart />
                </div>
                <div className="w-96">kanan</div>
            </div>
        </AuthenticatedLayout>
    );
}
