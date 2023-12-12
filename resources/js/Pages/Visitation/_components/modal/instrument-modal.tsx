import React, {useEffect, useState} from "react";
import {AlertTriangle, RotateCw, X} from "lucide-react";
import {Link, router} from "@inertiajs/react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import Modal from "@/Components/Modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Checkbox } from "@/Components/ui/checkbox"
import useVisitationContext from "@/Context/useVisitationContext";
import axios from "axios";
import {toast} from "sonner";
import InstrumentItem from "@/Pages/Visitation/_components/instrument-item";


interface InstrumentModalProps {
    onClose: () => void;
    instrumentId : number;
    name: string;
}

type InstrumentItems = {
    id: number;
    title: string;
}

const InstrumentModal = ({onClose, instrumentId, name}: InstrumentModalProps) => {

    const {assessmentId} = useVisitationContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<InstrumentItems [] | []>([])

    useEffect(() => {
        getInstrumentItems()
    }, []);

    const getInstrumentItems = async () => {
        setIsLoading(true)
        await axios.get(`/visitation/${assessmentId}/instrument/${instrumentId}/items`)
            .then((data) => {
                setItems(data.data.data)
            })
            .catch((err) => {
                const { data, status, statusText } = err.response;
                toast.error(`${statusText} ${status}`, {
                    description: `${data.message}`,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            <Modal
                onClose={onClose}
                show={true}
                closeable={!isLoading}
                maxWidth="xxl"
            >
                <div className="px-10 py-6 max-h-[800px] overflow-y-auto">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-md text-center font-bold capitalize">
                            Instruments {name}
                        </h2>
                        <div onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                            <X className="h-5 w-5" />
                        </div>
                    </div>

                    {isLoading && (
                        <div className="w-full flex items-center justify-center my-10">
                            <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                            <p className="text-muted-foreground text-sm">Mengambil data...</p>
                        </div>
                    )}

                    {
                        !isLoading && (
                            <>
                                <Alert className="mt-3 bg-yellow-50 border border-yellow-200">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Informasi</AlertTitle>
                                    <AlertDescription className="text-muted-foreground">
                                        Instrument ini di upload 1 kali oleh guru, silahkan ganti terkait peraturan upload di menu
                                        <span className="ml-1">
                                <Link href={route("instrumental.index")} className="font-semibold text-sky-600 underline cursor-pointer">Instrument & nilai</Link>
                            </span>
                                    </AlertDescription>
                                </Alert>

                                <Table className="mt-7 border" >
                                    <TableHeader className="text-xs font-semibold">
                                        <TableRow>
                                            <TableHead rowSpan={2}>NO.</TableHead>
                                            <TableHead rowSpan={2} className="text-center">JUDUL</TableHead>
                                            <TableHead colSpan={3} className="text-center border">NILAI</TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border text-center">Tidak ada (0)</TableHead>
                                            <TableHead className="text-center">Ada tetapi tidak sesuai (1)</TableHead>
                                            <TableHead className="border-x text-center">Ada dan sesuai (2)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            items.map((item, index) => (
                                                <InstrumentItem
                                                    id={item.id}
                                                    title={item.title}
                                                    key={index}
                                                    index={index}
                                                />
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </>
                        )
                    }

                </div>
            </Modal>
        </div>
    )
}

export default InstrumentModal;
