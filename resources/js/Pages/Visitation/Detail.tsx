import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Head } from "@inertiajs/react";
import { Assessment, Component } from "@/types/app";
import useVisitationContextNew from "@/Context/useVisitationContextNew";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { TableItem } from "./_components/detail/table-item";
import { Answer } from "./_components/detail/answer";
import { Hint } from "@/Components/Hint";
import { Note } from "./_components/detail/note";
import { Score } from "./_components/detail/Score";
import { UserInfo } from "./_components/detail/user-info";

interface DetailProps {
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

const DetailVisitationPage = ({ data }: DetailProps) => {
    const { setAssessmentId } = useVisitationContextNew();

    useEffect(() => {
        setAssessmentId(data.assessment.id);
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Filter",
                    url: "visitation.index",
                    disabled: false,
                },
                {
                    title: "Supervisi",
                    url: "visitation.filter",
                    disabled: false,
                    params: {
                        academic_year:
                            data.assessment.academic_semester.academic_year,
                        smt: data.assessment.academic_semester.semester,
                    },
                },
                {
                    title: data.assessment.teacher.name,
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title="Supervisi detail" />

            <div className="mt-4 container mx-auto max-w-7xl mb-10 flex md:flex-row flex-col md:gap-x-10 gap-x-0">
                <div className="md:w-1/4 w-full">
                    <UserInfo
                        user={data.assessment.teacher}
                        component_max_score={data.component_max_score}
                        total_score={data.total_score}
                        final_score={data.final_score}
                        assessmentStatus={data.assessment.status}
                    />
                </div>
                <div className="md:w-3/4 w-full space-y-10">
                    <div className="">
                        <Answer
                            startedAt={data.assessment.started_at}
                            finishedAt={data.assessment.finished_at}
                            defaultData={
                                data.assessment.assessment_answers ?? null
                            }
                        />
                    </div>
                    <div className="border-t-2 border-sky-700  rounded ">
                        <div className="flex justify-between bg-gray-100 rounded p-4">
                            <Heading
                                title={`Instrumen Evaluasi Supervisi Guru`}
                                description={`Silakan berikan penilaian Anda menggunakan instrumen ini untuk guru yang sedang Anda Supervisi.`}
                            />
                            <Hint
                                description={
                                    isOpen ? "Close section" : "Open section"
                                }
                            >
                                <ChevronDown
                                    onClick={handleClick}
                                    className={`transition-transform duration-500 ${
                                        isOpen ? "" : "transform -rotate-90"
                                    }`}
                                />
                            </Hint>
                        </div>
                        <Table
                            className={cn(
                                "border mt-4 transition-all duration-500",
                                !isOpen && "hidden"
                            )}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        rowSpan={2}
                                        className="border text-center"
                                    >
                                        No
                                    </TableHead>
                                    <TableHead rowSpan={2} className="border">
                                        Sub Komponen dan Butir komponen
                                    </TableHead>
                                    <TableHead
                                        colSpan={4}
                                        className="text-center border"
                                    >
                                        Skor Nilai
                                    </TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="border text-center">
                                        1
                                    </TableHead>
                                    <TableHead className="border text-center">
                                        2
                                    </TableHead>
                                    <TableHead className="border text-center">
                                        3
                                    </TableHead>
                                    <TableHead className="border text-center">
                                        4
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.instruments.map((instrument, index) => (
                                    <TableItem
                                        instrument={instrument}
                                        index={index}
                                        key={index}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-full mt-10">
                        <Score
                            component_max_score={data.component_max_score}
                            total_score={data.total_score}
                            final_score={data.final_score}
                        />
                    </div>

                    <div>
                        <Note
                            defaultData={{
                                findings: data.assessment.findings,
                                action_plan: data.assessment.action_plan,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default DetailVisitationPage;
