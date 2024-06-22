import React, {useState} from "react";

import useVisitationContextNew from "@/Context/useVisitationContextNew";
import {Button} from "@/Components/ui/button";
import {AlertTriangle, RotateCw} from "lucide-react";
import Modal from "@/Components/Modal";
import axios from "axios";
import {toast} from "sonner";
import {router} from "@inertiajs/react";

export const FinishModal = () => {

    const { assessmentId } = useVisitationContextNew();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpenModalAdd(!isOpenModalAdd);
    };

    const handleFinish = async () => {

        setIsLoading(true);
        await axios
            .put(`/visitation/${assessmentId}/finish`)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.reload();
                toggleModal()
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
        <div>
            <Button onClick={toggleModal} className="mt-10 w-full">
                Selesaikan visitasi
            </Button>

            <Modal
                onClose={toggleModal}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="xl"
            >
                <div className="px-10 py-4">
                    <div className="w-full flex items-center justify-center flex-col">
                        <div className="bg-red-100 p-3 rounded-full">
                            <AlertTriangle className="h-5 w-5 stroke-red-700"/>
                        </div>
                        <h2 className="font-semibold mt-3 text-gray-700">Apakah Anda Yakin?</h2>
                        <p className="text-sm text-muted-foreground mt-2 text-left">
                            Saat Anda menyelesaikan visitasi ini, semua penilaian dan tindakan terkait guru di visitasi ini akan
                            <span className="font-semibold"> ditiadakan.</span> Baca selengkapnya <a href="#" className="underline text-sky-600">disini</a>
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-y-2 mt-6 mb-3">
                        <Button
                            className="w-full bg-sky-700 hover:bg-sky-600"
                            disabled={isLoading}
                            onClick={handleFinish}
                        >
                            {isLoading && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Iya, selesaikan
                        </Button>
                        <Button disabled={isLoading} variant="outline" onClick={toggleModal}>
                            Tidak
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
