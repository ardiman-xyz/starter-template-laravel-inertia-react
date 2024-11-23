import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Component } from "@/types/app";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { CreateInstrumentItemModal } from "./_components/create-instrument-item-modal";
import { InstrumentItemDetail } from "./_components/instrument-item-detail";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DetailProps {
    instrument: Component;
}

const DetailInstrument = ({ instrument }: DetailProps) => {
    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Instrumen",
                    url: "instrument.index",
                    disabled: false,
                },
                {
                    title: "Detail",
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title={`${instrument.name}`} />
            <Heading
                title={instrument.name}
                description={instrument.description}
            />
            <div className="mt-7">
                <CreateInstrumentItemModal documentId={instrument.id} />

                <Alert className="my-4 bg-orange-100 border border-orange-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription className="text-gray-600 text-xs mt-1">
                        Nilai item min <span className="font-bold">1</span>, dan
                        max <span className="font-bold">4</span>
                    </AlertDescription>
                </Alert>

                <Table className="mt-4 border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead className="text-center">
                                Maksimal Skor
                            </TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instrument.details.map((item, index) => (
                            <InstrumentItemDetail
                                instrument={item}
                                index={index}
                                key={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    );
};

export default DetailInstrument;
