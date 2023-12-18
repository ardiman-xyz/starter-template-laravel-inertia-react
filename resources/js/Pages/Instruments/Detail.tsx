import {Head} from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Component} from "@/types/app";

import Heading from "@/Components/Heading";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/Components/ui/table";
import {CreateInstrumentItemModal} from "./_components/create-instrument-item-modal";
import {InstrumentItemDetail} from "./_components/instrument-item-detail";

interface DetailProps {
    instrument: Component
}

const DetailInstrument = ({instrument}: DetailProps) => {


    return(
        <Authenticated
            breadCrumbs={
                [
                    {
                        title : "Instrumen",
                        url: "instrument.index",
                        disabled: false
                    },
                    {
                        title : "Detail",
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title={`${instrument.name}`} />
            <Heading title={instrument.name} description={instrument.description} />
            <div className="mt-7">
                <CreateInstrumentItemModal documentId={instrument.id} />

                <Table className="mt-7 border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Maksimal Skor</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            instrument.details.map((item, index) => (
                                <InstrumentItemDetail
                                    instrument={item}
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

export default DetailInstrument;
