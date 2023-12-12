import React, {useState} from "react";
import Modal from "@/Components/Modal";
import {AlertTriangle, RotateCw} from "lucide-react";
import {Button} from "@/Components/ui/button";
import axios from "axios";
import {toast} from "sonner";
import {router} from "@inertiajs/react";

interface IProps {
    onClose : () => void;
    id?: number;
}

const CancelConfirm = ({onClose, id}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCancelAction = async () => {

        setIsLoading(true);
        await axios
            .delete(`/visitation/date/${id}`)
            .then((data) => {
                console.info(data)
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
                onClose()
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
    }

    return (
        <Modal
            onClose={onClose}
            show={true}
            closeable={!isLoading}
            maxWidth="xl"
        >
            <div className="px-10 py-4">
                <div className="w-full flex items-center justify-center flex-col">
                    <div className="bg-red-100 p-3 rounded-full">
                        <AlertTriangle className="h-5 w-5 stroke-red-700"/>
                    </div>
                    <h2 className="font-semibold mt-3 text-gray-700">Apakah anda yakin ?</h2>
                    <p className="text-sm text-muted-foreground mt-2 text-center">Apakah anda yakin ingin membatalkan tanggal supervisi</p>
                </div>
                <div className="w-full flex flex-col gap-y-2 mt-6 mb-3">
                    <Button
                        className="w-full bg-red-700"
                        variant="destructive"
                        disabled={isLoading}
                        onClick={handleCancelAction}
                    >
                        {isLoading && (
                            <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Iya, Batalkan
                    </Button>
                    <Button disabled={isLoading} variant="outline" onClick={onClose}>
                        Tidak
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default CancelConfirm;
