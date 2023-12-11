import React, {useState} from "react";
import axios from "axios";
import {AlertTriangle, RotateCw} from "lucide-react";
import {toast} from "sonner";
import {router} from "@inertiajs/react";

import Modal from "@/Components/Modal";
import {Button} from "@/Components/ui/button";

interface DeleteActionProps {
    id: string;
    teacher_name : string;
    onClose : () => void;
}

export const DeleteAction = ({id, teacher_name, onClose}: DeleteActionProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDelete = async () => {
        setIsLoading(true)
        await axios.delete("/visitation/teacher/"+id)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                onClose();
                router.reload();
            }).catch((err) => {
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
            maxWidth="md"
        >
            <div className="px-10 py-4">
                <div className="w-full flex items-center justify-center flex-col">
                    <div className="bg-red-100 p-3 rounded-full">
                        <AlertTriangle className="h-5 w-5 stroke-red-700" />
                    </div>
                    <h2 className="font-semibold mt-3 text-gray-700">Apakah anda yakin ?</h2>
                    <p className="text-sm text-muted-foreground mt-2 text-center">Anda yakin ingin menghapus data supervisi dari <span className="font-bold">{teacher_name} ?</span> , Aksi ini tidak dapat di kembalikan, data akan dihapus secara permanen di database!</p>
                </div>
                <div className="w-full flex flex-col gap-y-2 mt-6 mb-3">
                    <Button
                        className="w-full bg-red-700"
                        variant="destructive"
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        {isLoading && (
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Hapus
                    </Button>
                    <Button disabled={isLoading} variant="outline" onClick={onClose}>
                        Batalkan
                    </Button>
                </div>
            </div>
        </Modal>

    )
}
