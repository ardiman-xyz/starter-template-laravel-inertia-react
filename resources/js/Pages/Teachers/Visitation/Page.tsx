import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Assessment } from "@/types/app";
import { TableItem } from "./_components/table-item";
import { useState } from "react";
import PreviewReport from "./_components/preview-report";

interface IProps {
    assessments: Assessment[];
}

const VisitationIndexPage = ({ assessments }: IProps) => {
    const [previewReport, setPreviewReport] = useState<boolean>(false);

    const togglePreviewReport = (event: React.MouseEvent) => {
        event.stopPropagation();
        setPreviewReport(!previewReport);
    };

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
                                    togglePreviewReport={togglePreviewReport}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>

            {previewReport && (
                <PreviewReport
                    isOpen={previewReport}
                    onClose={() => setPreviewReport(false)}
                />
            )}
        </Authenticated>
    );
};

export default VisitationIndexPage;
