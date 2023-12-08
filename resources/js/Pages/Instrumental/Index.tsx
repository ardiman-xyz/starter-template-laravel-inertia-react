import {Head, Link} from "@inertiajs/react";

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
import {Button} from "@/Components/ui/button";
import {Settings} from "lucide-react";
import StageCreateModal from "./_components/stage-create-modal";

interface IProps {
    stages: {
        id: number;
        name : string
    }[];
}

const InstrumentalPage = ({stages}: IProps) => {
    return (
        <Authenticated>
            <Head title="Instrumen penilain" />
            <Heading
                title="Instrumen"
                description="Manajemen instrumen penilain supervisi"
            />
            <div>

                    <Table className="border mt-7">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No.</TableHead>
                                <TableHead>Step</TableHead>
                                <TableHead>Jumlah instrumen</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                stages.map((stage, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="capitalize">{stage.name}</TableCell>
                                        <TableCell>10</TableCell>
                                        <TableCell>
                                            <Link href={route("instrumental.stage", stage.id)}>
                                                <Button>
                                                    <Settings className="w-4 h-4 mr-2"/>
                                                    Setting
                                                </Button>
                                            </Link>
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

export default InstrumentalPage;
