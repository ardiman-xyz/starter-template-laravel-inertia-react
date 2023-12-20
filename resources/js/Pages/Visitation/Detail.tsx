
import {Head} from "@inertiajs/react";

import {Assessment, Component} from "@/types/app";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import useVisitationContext from "@/Context/useVisitationContext";
import Heading from "@/Components/Heading";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {TableItem} from "./_components/detail/table-item";


interface DetailProps {
    data: {
        assessment: Assessment,
        instruments: Component []
    }
}

const DetailVisitationPage = ({data}: DetailProps) => {

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
            <Heading
                title={`Visitasi`}
                description={`List instrument dan nilai`}
            />
            <div className="mt-4 w-full mb-10">
                <Table className="mt-7 border">
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2} className="border text-center">No</TableHead>
                            <TableHead rowSpan={2} className="border">Sub Komponen dan Butir komponen</TableHead>
                            <TableHead  colSpan={4} className="text-center border">Skor Nilai</TableHead>
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
        </Authenticated>
    )
}

export default DetailVisitationPage;
