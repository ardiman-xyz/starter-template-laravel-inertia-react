// Pages/Visitation/BulkReport.tsx
import React, { useEffect } from "react";
import { format } from "date-fns";
import { Assessment, Component } from "@/types/app";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { formatDate, formatIndonesianDate } from "@/helper";

interface BulkReportData {
    assessment: Assessment;
    instruments: Component[];
    component_max_score: number;
    total_score: number;
    final_score: {
        final_score: number;
        evaluate: string;
    };
}

interface Props {
    data: BulkReportData[];
}

const BulkReport = ({ data }: Props) => {
    useEffect(() => {
        window.print();
    }, []);

    return (
        <Guest>
            <Head title="Laporan Hasil Supervisi" />

            <div className="container mx-auto py-6 max-w-[210mm] bg-white">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold">
                        Laporan Hasil Supervisi Pembelajaran Guru
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Tahun Akademik{" "}
                        {data[0]?.assessment.academic_semester.academic_year} -
                        Semester{" "}
                        <span className="capitalize">
                            {" "}
                            {data[0]?.assessment.academic_semester.semester}
                        </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        {data[0]?.assessment.school.name}
                    </p>
                </div>

                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">No</th>
                            <th className="py-2 text-left">Nama Guru</th>
                            <th className="py-2 text-left">Tanggal</th>
                            <th className="py-2 text-center">Skor</th>
                            <th className="py-2 text-center">Nilai</th>
                            <th className="py-2 text-left">Hasil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.assessment.id} className="border-b">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">
                                    {item.assessment.teacher.name}
                                </td>
                                <td className="py-2">
                                    {formatIndonesianDate(
                                        item.assessment.started_at
                                    )}
                                </td>
                                <td className="py-2 text-center">
                                    {item.total_score} /{" "}
                                    {item.component_max_score}
                                </td>
                                <td className="py-2 text-center">
                                    {item.final_score.final_score}%
                                </td>
                                <td className="py-2">
                                    <span
                                        className={`px-2 py-0.5 rounded text-sm ${
                                            item.final_score.evaluate ===
                                            "Baik Sekali"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-orange-100 text-orange-800"
                                        }`}
                                    >
                                        {item.final_score.evaluate}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6">
                    <h2 className="text-sm font-medium mb-2">Ringkasan:</h2>
                    <div className="text-sm space-y-1 text-muted-foreground">
                        <p>Total Guru: {data.length}</p>
                        <p>
                            Periode:{" "}
                            {formatIndonesianDate(
                                data[0]?.assessment.academic_semester.start_date
                            )}{" "}
                            -{" "}
                            {formatIndonesianDate(
                                data[0]?.assessment.academic_semester.end_date
                            )}
                        </p>
                        <p>
                            Rata-rata Nilai:{" "}
                            <span className="text-black">
                                {" "}
                                {(
                                    data.reduce(
                                        (acc, item) =>
                                            acc + item.final_score.final_score,
                                        0
                                    ) / data.length
                                ).toFixed(1)}
                                %
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-sm">
                    <div className="text-right">
                        <p>
                            Kendari,{" "}
                            {formatIndonesianDate(new Date().toISOString())}
                        </p>
                        <p>Kepala Sekolah</p>
                        <div className="h-20"></div>
                        <p className="font-medium">
                            {data[0]?.assessment.school.leader_name}
                        </p>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default BulkReport;
