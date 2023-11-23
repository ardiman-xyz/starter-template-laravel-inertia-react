import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import CreateModal from "./_components/create-modal";
import { Role } from "@/types/app";
import { User } from "@/types";
import TableItem from "./_components/table-item";

interface IndexPops {
    roles: Role[];
    users: User[];
}

const Index = ({ roles, users }: IndexPops) => {
    return (
        <Authenticated>
            <Head title="Users" />
            <div>
                <Heading
                    title="Users"
                    description="Manage users and role users"
                />

                <div className="mt-6 mb-3">
                    <CreateModal roles={roles} />
                </div>

                <Table className="bg-white p-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Eamil</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableItem key={index} user={user} index={index} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    );
};

export default Index;
