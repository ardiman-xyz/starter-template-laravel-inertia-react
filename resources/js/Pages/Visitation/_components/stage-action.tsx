import {useState} from "react";
import {ClipboardList, MoreHorizontal, Pencil, XCircle} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {SettingDateModal} from "@/Pages/Visitation/_components/modal/setting-date-modal";
import {Schedule} from "@/types/app";
import CancelConfirm from "@/Pages/Visitation/_components/modal/cancel-confirm";
import InstrumentModal from "@/Pages/Visitation/_components/modal/instrument-modal";


interface IProps {
    id: number;
    name: string;
    scheduled?: Schedule
}

export const StageAction = ({id, name, scheduled}: IProps) => {

    const [modalSetUpDate, setModalSetUpDate] = useState<boolean>(false);
    const [cancelModal, setCancelModal] = useState<boolean>(false);
    const [instrumentModal, setInstrumentModal] = useState<boolean>(false);

    const dateTitleMenu = scheduled?.status ? "Ubah tanggal" : "Atur tanggal ";

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setModalSetUpDate(true)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        {dateTitleMenu}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setInstrumentModal(true)}>
                        <ClipboardList className="w-4 h-4 mr-2" /> Instrumen & nilai
                    </DropdownMenuItem>
                    {
                        scheduled?.status && (
                            <DropdownMenuSeparator />
                        )
                    }
                    {
                        scheduled?.status && (
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setCancelModal(true)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Batalkan
                            </DropdownMenuItem>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {
                modalSetUpDate && (
                    <SettingDateModal schedule={scheduled} id={id} name={name} onClose={() => setModalSetUpDate(false)} />
                )
            }

            {
                cancelModal && (
                    <CancelConfirm id={scheduled?.id} onClose={() => setCancelModal(false)} />
                )
            }

            {
                instrumentModal && (
                    <InstrumentModal  onClose={() => setInstrumentModal(false)} instrumentId={id} name={name} />
                )
            }
        </div>
    )
}
