import Heading from "@/Components/Heading";
import { Hint } from "@/Components/Hint";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Edit, Trash } from "lucide-react";

const Index = () => {
    return (
        <Authenticated>
            <Head title="Roles" />
            <div>
                <Heading title="Roles" description="Manage role user" />

                <div className="mt-6 mb-2">
                    <Button>Tambah</Button>
                </div>

                <Table className="bg-white p-4 shadow rounded">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell className="flex items-center gap-x-2">
                                <Hint
                                    description="Edit"
                                    side="top"
                                    sideOffset={4}
                                >
                                    <Button size="sm" variant="outline">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Hint>

                                <Hint
                                    description="Hapus"
                                    side="top"
                                    sideOffset={4}
                                >
                                    <Button size="sm">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </Hint>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            {/* <Modal onClose={() => {}} show={true} closeable={true}>
                My Modal
            </Modal> */}
        </Authenticated>
    );
};

export default Index;
