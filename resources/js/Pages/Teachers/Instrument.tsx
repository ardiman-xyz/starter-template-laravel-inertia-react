import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Component } from "@/types/app";
import { Head } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";
import React from "react";

interface Props {
    components: Component[];
}

const Instrument = ({ components }: Props) => {
    if (!components?.length) {
        return (
            <Authenticated>
                <Head title="Instrument" />

                <div className="container mx-auto py-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Butir Komponen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground mb-2">
                                    Belum ada instrument penilaian
                                </p>
                                <p className="text-sm text-muted-foreground text-center max-w-md">
                                    Sekolah Anda belum melakukan pengaturan
                                    instrument penilaian guru. Silakan hubungi
                                    administrator sekolah untuk melakukan
                                    penginputan instrument penilaian.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Authenticated>
        );
    }

    return (
        <Authenticated>
            <Head title="Instrument" />

            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Butir Komponen</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Instrumen ini digunakan sebagai alat penilaian
                            kinerja guru dalam proses pembelajaran. Setiap
                            komponen dinilai dengan skor maksimal yang telah
                            ditentukan untuk mengukur kualitas pembelajaran yang
                            dilaksanakan oleh guru. Penilaian mencakup kegiatan
                            pembukaan dan kegiatan inti pembelajaran.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 border">
                                        No
                                    </TableHead>
                                    <TableHead className="border">
                                        Butir komponen
                                    </TableHead>
                                    <TableHead className="w-32 border">
                                        Max Score
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {components?.map((component, index) => (
                                    <React.Fragment key={component.id}>
                                        <TableRow className="">
                                            <TableCell
                                                rowSpan={
                                                    component.details.length + 1
                                                }
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                className="font-medium text-lg bg-muted border-l"
                                                colSpan={2}
                                            >
                                                {component.name}
                                            </TableCell>
                                        </TableRow>

                                        {component.details.map(
                                            (detail, detailIndex) => (
                                                <TableRow
                                                    key={detail.id}
                                                    className="border"
                                                >
                                                    <TableCell className="py-3 whitespace-normal border">
                                                        <div className="flex">
                                                            <span className="mr-2">
                                                                {String.fromCharCode(
                                                                    97 +
                                                                        detailIndex
                                                                )}
                                                                .
                                                            </span>
                                                            <span className="flex-1">
                                                                {detail.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {detail.max_Score}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Instrument;
