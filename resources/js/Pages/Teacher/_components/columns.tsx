
import { ColumnDef } from "@tanstack/react-table"
import {ClipboardEdit, Link2, MoreHorizontal, Trash2} from "lucide-react";

import {User} from "@/types/app";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Button} from "@/Components/ui/button";
import InviteLinkModal from "./invite-link-modal";
import {useState} from "react";
import EditModal from "./edit-modal";
import DeleteConfirm from "./delete-confirm";


const ActionMenu = ({ data }: { data: User }) => {

    const [isModalInviteOpen, setIsModalInviteOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

    const toggleModalInvite = () => setIsModalInviteOpen(!isModalInviteOpen);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={toggleModalInvite}
                    >
                        <Link2 className="h-4 w-4 mr-2" />
                        Invite link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIsModalEditOpen(true)}
                    >
                        <ClipboardEdit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={()=> setIsModalDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                isModalInviteOpen && (
                    <InviteLinkModal teacherId={data.id} onClose={toggleModalInvite}  />
                )
            }

            {
                isModalEditOpen && (
                    <EditModal user={data} onClose={() => setIsModalEditOpen(false)}  />
                )
            }
            {
                isModalDeleteOpen && (
                    <DeleteConfirm user={data} onClose={() => setIsModalDeleteOpen(false)}  />
                )
            }

        </div>
    );
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <ActionMenu data={row.original} />;
        },
    },
]
