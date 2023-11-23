import Heading from "@/Components/Heading";
import { Hint } from "@/Components/Hint";
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
import CreateModal from "./_components/create-modal";
import TableItem from "./_components/table-item";

interface indexProps {
    roles: {
        id: string;
        name: string;
    }[];
}

const Index = ({ roles }: indexProps) => {
    return (
        <Authenticated>
            <Head title="Roles" />
            <div>
                <Heading title="Roles" description="Manage role" />

                <div className="mt-6 mb-2">
                    <CreateModal />
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
                        {roles.length > 0 &&
                            roles.map((role, index) => (
                                <TableItem
                                    id={role.id}
                                    name={role.name}
                                    index={index}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    );
};

export default Index;
