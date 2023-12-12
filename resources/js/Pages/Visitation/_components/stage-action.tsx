import {useState} from "react";
import {MoreHorizontal} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {SettingDateModal} from "@/Pages/Visitation/_components/modal/setting-date-modal";


interface IProps {
    id: number;
    name: string;
    scheduled?: boolean
}

export const StageAction = ({id, name, scheduled}: IProps) => {

    const [modalSetUpDate, setModalSetUpDate] = useState<boolean>(false);

    const dateTitleMenu = scheduled ? "Ubah tanggal" : "Atur tanggal ";

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Visitation </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setModalSetUpDate(true)}>{dateTitleMenu}</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                modalSetUpDate && (
                    <SettingDateModal id={id} name={name} onClose={() => setModalSetUpDate(false)} />
                )
            }
        </div>
    )
}
