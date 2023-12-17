import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {Component} from "@/types/app";
import Heading from "@/Components/Heading";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/ui/table";
import {Button} from "@/Components/ui/button";
import {Settings} from "lucide-react";

interface DetailProps {
    instrument: Component
}

const DetailInstrument = ({instrument}: DetailProps) => {
    console.info(instrument)
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
                <Table className="mt-7 border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Tahun akademik</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            instrument.details.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="capitalize">
                                    <span className="group-hover:underline group-hover:text-blue-800 transition-colors">
                                        {item.name}
                                    </span>
                                    </TableCell>
                                    <TableCell>
                                        -
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    )
}

export default DetailInstrument;
