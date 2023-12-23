
import {Head} from "@inertiajs/react";

import {Assessment, Component} from "@/types/app";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {TableItem} from "./_components/detail/table-item";
import useVisitationContextNew from "@/Context/useVisitationContextNew";
import {useEffect, useState} from "react";
import {Answer} from "@/Pages/Visitation/_components/detail/answer";
import {Hint} from "@/Components/Hint";


interface DetailProps {
    data: {
        assessment: Assessment,
        instruments: Component []
    }
}

const DetailVisitationPage = ({data}: DetailProps) => {

    const { setAssessmentId } = useVisitationContextNew();

    useEffect(() => {
        setAssessmentId(data.assessment.id)
    }, [])

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };



    return(
        <Authenticated
            breadCrumbs={
                [
                    {
                        title : "Filter",
                        url: "visitation.index",
                        disabled: false
                    },
                    {
                        title : "Supervisi",
                        url: "visitation.filter",
                        disabled: false,
                        params: {
                            year: data.assessment.academic_semester.year,
                            smt: data.assessment.academic_semester.semester
                        }
                    },
                    {
                        title : data.assessment.teacher.name,
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title="Supervisi detail" />

            <div className="mt-4 container mx-auto max-w-5xl mb-10">
                <div className="">
                    <Answer />
                </div>
                <div className="mt-10">
                    <div className="flex justify-between bg-gray-100 rounded p-4">
                        <Heading
                            title={`Instrumen Evaluasi Visitasi Guru`}
                            description={`Silakan berikan penilaian Anda menggunakan instrumen ini untuk guru yang sedang Anda visitasi.`}
                        />
                        <Hint description={isOpen ? "Close section" : "Open section"}>
                            <ChevronDown onClick={handleClick}
                                         className={`transition-transform duration-500 ${isOpen ? "" : "transform -rotate-90"}`}/>
                        </Hint>
                    </div>
                    <Table className={cn("border mt-4 transition-all duration-500", !isOpen && "hidden")}>
                        <TableHeader>
                            <TableRow>
                                <TableHead rowSpan={2} className="border text-center">No</TableHead>
                                <TableHead rowSpan={2} className="border">Sub Komponen dan Butir komponen</TableHead>
                                <TableHead colSpan={4} className="text-center border">Skor Nilai</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead className="border text-center">1</TableHead>
                                <TableHead className="border text-center">2</TableHead>
                                <TableHead className="border text-center">3</TableHead>
                                <TableHead className="border text-center">4</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.instruments.map((instrument, index) => (
                                    <TableItem
                                        instrument={instrument}
                                        index={index}
                                        key={index}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>

            </div>
        </Authenticated>
    )
}

export default DetailVisitationPage;
