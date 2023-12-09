import {Head} from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import StageCreateModal from "./_components/stage-create-modal";
import InstrumentTableItem from "@/Pages/Instrumental/_components/instrument-table-item";
import {Instrument} from "@/types/app";

interface IProps {
    stage: {
        id: number;
        name: string;
    },
    instruments : Instrument[]
}

const SettingInstrumentPage = ({stage, instruments}: IProps) => {

    return (
        <Authenticated>
            <Head title="Setting instrumen pra observasi"/>
            <Heading
                title="Pengaturan step"
                description="Manajemen pengaturan instrumen step pra observasi"
            />

            <div className="mt-6 mb-3">
                <StageCreateModal stage={stage} />
            </div>

            <div className="mt-2">
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Tipe respon</TableHead>
                            <TableHead>Jumlah item</TableHead>
                            <TableHead>Jumlah poin</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            instruments.map((instrument, index) => (
                                <InstrumentTableItem
                                    instrument={instrument}
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

export default SettingInstrumentPage
