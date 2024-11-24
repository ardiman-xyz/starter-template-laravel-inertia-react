import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { formatDateTime } from "@/lib/datetime";
import { Assessment } from "@/types/app";
import {
    AlertCircle,
    Award,
    BookOpen,
    CalendarDays,
    CheckCircle,
    Clock,
    GraduationCap,
    XCircle,
} from "lucide-react";

interface Props {
    assessment: Assessment;
    status: string;
    component_max_score: number;
    total_score: number;
    final_score: {
        evaluate: string;
        final_score: number;
    };
}

const getScoreStyle = (evaluate: string) => {
    switch (evaluate.toLowerCase()) {
        case "baik sekali":
            return {
                bgColor: "bg-green-100",
                textColor: "text-green-700",
            };
        case "baik":
            return {
                bgColor: "bg-blue-100",
                textColor: "text-blue-700",
            };
        case "cukup":
            return {
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-700",
            };
        case "kurang":
            return {
                bgColor: "bg-red-100",
                textColor: "text-red-700",
            };
        default:
            return {
                bgColor: "bg-gray-100",
                textColor: "text-gray-700",
            };
    }
};

const getScoreIcon = (evaluate: string) => {
    switch (evaluate.toLowerCase()) {
        case "baik sekali":
            return <Award className="w-5 h-5" />;
        case "baik":
            return <CheckCircle className="w-5 h-5" />;
        case "cukup":
            return <AlertCircle className="w-5 h-5" />;
        case "kurang":
            return <XCircle className="w-5 h-5" />;
        default:
            return null;
    }
};

export const AssesmentInfo = ({
    assessment,
    component_max_score,
    total_score,
    final_score,
    status,
}: Props) => {
    const scoreStyle = getScoreStyle(final_score.evaluate);

    // Progress bar color berdasarkan score
    const getProgressColor = (score: number) => {
        if (score >= 86) return "bg-green-500";
        if (score >= 70) return "bg-blue-500";
        if (score >= 55) return "bg-yellow-500";
        return "bg-red-500";
    };

    // Status visitasi badge
    const getStatusBadge = () => {
        switch (status) {
            case "schedule":
                return <Badge variant="secondary">Dijadwalkan</Badge>;
            case "ongoing":
                return <Badge variant="warning">Sedang Berlangsung</Badge>;
            case "completed":
                return <Badge variant="success">Selesai</Badge>;
        }
    };

    return (
        <Card className="w-full max-w-sm ">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Info Supervisi
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-start space-x-4">
                    <GraduationCap className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Tahun Akademik
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {assessment.academic_semester.academic_year}
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <BookOpen className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Semester
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                            {assessment.academic_semester.semester}
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Jadwal Visitasi
                        </p>
                        <div className="text-sm text-muted-foreground">
                            <p>
                                Mulai:{" "}
                                {formatDateTime(assessment.started_at, "date")}
                            </p>
                            <p>
                                Selesai:{" "}
                                {formatDateTime(assessment.finished_at, "date")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Waktu
                        </p>
                        <div className="text-sm text-muted-foreground">
                            <p>
                                Mulai:{" "}
                                {formatDateTime(assessment.started_at, "time")}
                            </p>
                            <p>
                                Selesai:{" "}
                                {formatDateTime(assessment.finished_at, "time")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">Nilai Akhir</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-600">
                                Skor perolehan
                            </p>
                            <p className="font-medium text-2xl">
                                {total_score}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">
                                Skor maksimal
                            </p>
                            <p className="font-medium text-2xl">
                                {component_max_score}
                            </p>
                        </div>

                        <div className="pt-2">
                            <p className="text-sm text-gray-600">Hasil</p>
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-2xl">
                                    {final_score.final_score}%{" "}
                                </p>
                                <span
                                    className={`text-sm px-2 py-1 rounded-full ${scoreStyle.bgColor} ${scoreStyle.textColor} flex items-center gap-1`}
                                >
                                    {getScoreIcon(final_score.evaluate)}
                                    {final_score.evaluate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Alert>
                    <AlertDescription>
                        Status Visitasi: {getStatusBadge()}
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
};
