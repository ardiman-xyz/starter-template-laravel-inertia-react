import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Head } from "@inertiajs/react";

import { Assessment, Component } from "@/types/app";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import { Hint } from "@/Components/Hint";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Answer } from "./_components/answer";
import { Note } from "./_components/note";
import { InstrumentItem } from "./_components/instrument-item";
import useAssessmentStore from "@/Context/teacher/useAssessmentStore";
import { Score } from "./_components/score";
import { AssesmentInfo } from "./_components/AssesmentInfo";

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

const DetailVisitationPageTeacher = ({ data }: DetailProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const { setAssessmentId } = useAssessmentStore();

    useEffect(() => {
        setAssessmentId(data.assessment.id);
    }, []);

    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Supervisi",
                    url: "teacher.visitation.index",
                    disabled: false,
                },
                {
                    title: "Detail",
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title="Supervisi detail" />

            <div className="mt-4 container mx-auto max-w-7xl mb-10 flex md:flex-row flex-col md:gap-x-10 gap-x-0">
                <div className="md:w-1/4 w-full">
                    <div className="sticky top-4">
                        <AssesmentInfo
                            assessment={data.assessment}
                            component_max_score={data.component_max_score}
                            total_score={data.total_score}
                            final_score={data.final_score}
                        />
                    </div>
                </div>
                <div className="md:w-3/4 w-full space-y-10">
                    <div>
                        <Answer
                            status={data.assessment.status}
                            instruments={data.instruments}
                            assessmentAnswers={
                                data.assessment.assessment_answers
                            }
                        />
                    </div>

                    <div className="border-t-2 border-sky-700  rounded ">
                        <div className="flex justify-between bg-gray-100 p-4">
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
                                        Butir komponen
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
                                    <InstrumentItem
                                        instrument={instrument}
                                        index={index}
                                        key={index}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <Note
                            data={{
                                findings: data.assessment.findings,
                                action_plan: data.assessment.action_plan,
                            }}
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
        </Authenticated>
    );
};

export default DetailVisitationPageTeacher;
