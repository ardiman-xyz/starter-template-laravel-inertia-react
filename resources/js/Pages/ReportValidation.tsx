import React from "react";
import { Head } from "@inertiajs/react";
import { Shield, BadgeCheck, CalendarCheck } from "lucide-react";
import { format } from "date-fns";

import Guest from "@/Layouts/GuestLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Assessment } from "@/types/app";
import { formatDateTime } from "@/lib/datetime";

interface VerificationProps {
    data: {
        assessment: Assessment;
        component_max_score: number;
        total_score: number;
        final_score: {
            evaluate: string;
            final_score: number;
        };
    };
}

const Verification = ({ data }: VerificationProps) => {
    return (
        <Guest>
            <Head title="Verifikasi Supervisi" />

            <div className="container mx-auto py-12 max-w-xl">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <BadgeCheck className="w-16 h-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl mb-2">
                            Dokumen Supervisi Terverifikasi
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Dokumen ini telah terverifikasi dan tercatat dalam
                            sistem
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Informasi Utama */}
                        <div className="rounded-lg bg-muted p-4">
                            <h3 className="font-semibold mb-3 flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Informasi Supervisi
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        ID Supervisi
                                    </span>
                                    <span>{data.assessment.id}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Nama Guru
                                    </span>
                                    <span>{data.assessment.teacher.name}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Sekolah
                                    </span>
                                    <span>{data.assessment.school.name}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Tahun Akademik
                                    </span>
                                    <span>
                                        {
                                            data.assessment.academic_semester
                                                .academic_year
                                        }
                                    </span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Semester
                                    </span>
                                    <span className="capitalize">
                                        {
                                            data.assessment.academic_semester
                                                .semester
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hasil Penilaian */}
                        <div className="rounded-lg bg-muted p-4">
                            <h3 className="font-semibold mb-3 flex items-center">
                                <CalendarCheck className="w-4 h-4 mr-2" />
                                Detail Penilaian
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Tanggal Supervisi
                                    </span>
                                    <span>
                                        {formatDateTime(
                                            data.assessment.started_at
                                        )}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Hasil
                                    </span>
                                    <span>
                                        {data.final_score.final_score}% -{" "}
                                        {data.final_score.evaluate}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-muted-foreground">
                                        Tanggal Dibuat
                                    </span>
                                    <span>
                                        {formatDateTime(
                                            data.assessment.created_at
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center text-sm text-muted-foreground pt-4">
                            <p>
                                Dokumen ini dapat diverifikasi melalui sistem
                                Supervisi.
                            </p>
                            <p>
                                Setiap perubahan pada dokumen akan tercatat
                                dalam sistem.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Guest>
    );
};

export default Verification;
