import axios from "axios";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

interface ActionComponentProps {
    id: number;
    name: string;
    email: string;
    role: string;
}

const ActionComponent = ({ id, name, email, role }: ActionComponentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if (!confirm("Apakah anda yakin ?")) {
            ("no");
            return;
        }

        setIsLoading(true);

        await axios
            .delete(`users/${id}`)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
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
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                    <DropdownMenuItem onClick={handleDelete}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionComponent;
