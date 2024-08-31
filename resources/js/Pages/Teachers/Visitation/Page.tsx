import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Assessment } from "@/types/app";
import { TableItem } from "./_components/table-item";

interface IProps {
    assessments: Assessment[];
}

const VisitationIndexPage = ({ assessments }: IProps) => {
    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Visitasi",
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title="Visitasi" />
            <div>
                <Heading
                    title="Supervisi"
                    description="List supervisi yang pernah anda lakukan"
                />

                <Table className="mt-7 border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">
                                No.
                            </TableHead>
                            <TableHead>Tahun akademik</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assessments.length > 0 &&
                            assessments.map((assessment, index) => (
                                <TableItem
                                    data={assessment}
                                    key={assessment.id}
                                    index={index}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    );
};

export default VisitationIndexPage;
