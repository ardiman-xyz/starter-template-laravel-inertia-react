import {useEffect, useState} from "react";

import {Instrument} from "@/types/app";

import Modal from "@/Components/Modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import FooterModal from "@/Pages/Instrumental/_components/footer-modal";
import axios from "axios";
import {RotateCw} from "lucide-react";
import InstrumentItemsTable from "@/Pages/Instrumental/_components/instrument-items-table";


interface IProps {
    instrument: Instrument;
    onClose : () => void
}

type ItemsType = {
    id: number;
    title: string;
    max_score: number;
}

const InstrumentItemsModal = ({instrument, onClose}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<ItemsType[] | null>(null)

    useEffect(() => {
        getInstrumentItems()
    }, []);

    const getInstrumentItems = async () => {
        setIsLoading(true)
        await axios.get(`/instrumental/${instrument.id}/instrument/criteria`)
            .then(({data}) => {
                setItems(data.data)
            }).catch(err => {
                console.info(err)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <Modal
            onClose={onClose}
            show={true}
            closeable={!isLoading}
            maxWidth="xxl"
        >
            <div className="px-6 py-4 md:min-h-[700px] min-h-max overflow-y-auto relative">
                <h2 className="text-md font-bold text-center">
                   List instrumen upload data pra observasi
                </h2>

                    <div className="w-full flex items-center justify-center">
                        {
                            isLoading && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                            )
                        }
                    </div>

                {
                    ! isLoading && (
                        <>
                            <Table className="border mt-6">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead className="text-center">Skor maks.</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                </TableBody>
                                {
                                    items !== null &&
                                    items.map((item,index) => (
                                        <InstrumentItemsTable getData={getInstrumentItems}  items={item} index={index} />
                                    ))
                                }
                            </Table>

                            <FooterModal
                                getData={() => getInstrumentItems()}
                                instrumentId={instrument.id}
                            />
                        </>
                    )
                }
            </div>
        </Modal>
    )
}

export default InstrumentItemsModal;

