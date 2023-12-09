import {useState} from "react";

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


interface IProps {
    instrument: Instrument;
    onClose : () => void
}

const InstrumentItemsModal = ({instrument, onClose}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

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

                <Table className="border mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Skor maks.</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <FooterModal />
            </div>
        </Modal>
    )
}

export default InstrumentItemsModal;
