import { Menu, Settings } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";

import { Component } from "@/types/app";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/table";
import { CreateModal } from "./_components/create-modal";

import { TableItem } from "./_components/TableItem";

interface IProps {
    instruments: Component[];
}

const InstrumentsPage = ({ instruments }: IProps) => {
    const handleClick = (id: number) => {
        router.visit(route("instrument.detail", id));
    };

    return (
        <Authenticated>
            <Head title="instrument" />
            <Heading
                title="Instrumen"
                description="Manajemen instrumen penilain supervisi"
            />

            <div className="w-full mt-7 mb-4">
                <CreateModal />
            </div>

            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jumlah instrumen</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {instruments.map((item, index) => (
                        <TableItem key={item.id} item={item} index={index} />
                    ))}
                </TableBody>
            </Table>
        </Authenticated>
    );
};

export default InstrumentsPage;
