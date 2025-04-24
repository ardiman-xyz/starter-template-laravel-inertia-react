import { Head } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect } from "react";

import Guest from "@/Layouts/GuestLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Assessment, Component } from "@/types/app";
import { formatDateTime } from "@/lib/datetime";

interface PreviewProps {
    data: {
        assessment: Assessment;
        instruments: Component[];
        component_max_score: number;
        total_score: number;
        final_score: {
            evaluate: string;
            final_score: number;
        };
    };
}

const Preview = ({ data }: PreviewProps) => {
    const qrUrl = `${window.location.origin}/verification/${data.assessment.id}`;

    useEffect(() => {
        window.print();
    }, []);

    return (
        <Guest>
            <Head title="Laporan Supervisi" />

            <div className="container mx-auto py-6 max-w-[210mm] bg-white">
                <Card className="border-none shadow-none">
                    <CardHeader className="flex flex-row justify-between items-center px-8 pt-6 pb-4">
                        <CardTitle className="text-xl capitalize">
                            Hasil supervisi pengajaran
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 px-8">
                        <div className="relative mb-4">
                            <QRCodeSVG
                                value={qrUrl}
                                size={100}
                                level="H"
                                className="absolute top-0 right-0"
                            />
                        </div>

                        <table className="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td className="py-1 w-32 text-muted-foreground">
                                        Nama Guru
                                    </td>
                                    <td>: {data.assessment.teacher.name}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Email
                                    </td>
                                    <td>: {data.assessment.teacher.email}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Sekolah
                                    </td>
                                    <td>: {data.assessment.school.name}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Tahun Akademik
                                    </td>
                                    <td>
                                        :{" "}
                                        {
                                            data.assessment.academic_semester
                                                .academic_year
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Semester
                                    </td>
                                    <td className="capitalize">
                                        :{" "}
                                        <span className="capitalize">
                                            {
                                                data.assessment
                                                    .academic_semester.semester
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Tanggal
                                    </td>
                                    <td>
                                        :{" "}
                                        {formatDateTime(
                                            data.assessment.started_at
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-1 text-muted-foreground">
                                        Hasil
                                    </td>
                                    <td>
                                        : {data.total_score}/
                                        {data.component_max_score} (
                                        {data.final_score.final_score}% -{" "}
                                        {data.final_score.evaluate})
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 font-medium">
                                        Komponen
                                    </th>
                                    <th className="text-right w-20 font-medium">
                                        Skor
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                {data.instruments.map((instrument, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">
                                                {String.fromCharCode(
                                                    65 + index
                                                )}
                                                . {instrument.name}
                                            </td>
                                        </tr>
                                        {instrument.details.map(
                                            (detail, detailIndex) => (
                                                <tr key={detailIndex}>
                                                    <td className="py-1 pl-4">
                                                        {detailIndex + 1}.{" "}
                                                        {detail.name}
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-black">
                                                            {
                                                                detail.scored
                                                                    .score
                                                            }{" "}
                                                        </span>
                                                        / 4
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        <table className="w-full text-sm text-muted-foreground">
                            <tbody>
                                <tr>
                                    <td className="pt-2 pb-1 font-medium text-black">
                                        Temuan:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 whitespace-pre-line">
                                        {data.assessment.findings}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pt-2 pb-1 font-medium text-black">
                                        Tindak Lanjut:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 whitespace-pre-line">
                                        {data.assessment.action_plan}
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
