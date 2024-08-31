import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
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
import { Component } from "@/types/app";
import { Button } from "@/Components/ui/button";
import { Settings } from "lucide-react";

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
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {instruments.map((item, index) => (
                        <TableRow
                            key={index}
                            onClick={() => handleClick(item.id)}
                            className="cursor-pointer group"
                        >
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell className="capitalize">
                                <span className="group-hover:underline group-hover:text-blue-800 transition-colors">
                                    {item.name}
                                </span>
                            </TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                                <Link
                                    href={route("instrument.detail", item.id)}
                                >
                                    <Button>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Setting
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Authenticated>
    );
};

export default InstrumentsPage;
