import { Database, Menu, Plus, RotateCw, Settings } from "lucide-react";
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
import { DataEmpty } from "@/Components/data-empty";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

interface IProps {
    instruments: Component[];
}

const InstrumentsPage = ({ instruments }: IProps) => {
    const [isRunningMigration, setIsRunningMigration] =
        useState<boolean>(false);

    const handleRunMigration = async () => {
        try {
            setIsRunningMigration(true);
            await axios.post("/instruments/run-migration");
            toast.success("Data default berhasil ditambahkan");
            router.reload();
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "Gagal menambahkan data default";
            toast.error(message);
        } finally {
            setIsRunningMigration(false);
        }
    };

    return (
        <Authenticated>
            <Head title="instrument" />

            <Card className="py-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Instrumen
                            </CardTitle>
                            <CardDescription>
                                Manajemen instrumen penilaian supervisi
                            </CardDescription>
                        </div>
                        <CreateModal />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className="border">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No.</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">
                                    Jumlah instrumen
                                </TableHead>
                                <TableHead className="text-center">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {instruments.length > 0 ? (
                                instruments.map((item, index) => (
                                    <TableItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <tr className="relative">
                                    <td colSpan={4}>
                                        <div className="min-h-[200px] flex items-center justify-center flex-col">
                                            {/* Overlay ketika loading */}
                                            {isRunningMigration && (
                                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-3 z-50">
                                                    <div className="flex items-center gap-2">
                                                        <RotateCw className="h-4 w-4 animate-spin" />
                                                        <span>
                                                            Sedang memasukkan
                                                            data default...
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <DataEmpty />
                                            <div className="flex gap-2 mt-6">
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleRunMigration}
                                                    disabled={
                                                        isRunningMigration
                                                    }
                                                    className="flex items-center gap-x-2"
                                                >
                                                    {isRunningMigration ? (
                                                        <RotateCw className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Database className="h-4 w-4" />
                                                    )}
                                                    {isRunningMigration
                                                        ? "Memproses..."
                                                        : "Gunakan Data Default"}
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default InstrumentsPage;
