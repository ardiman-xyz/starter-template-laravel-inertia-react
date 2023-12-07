import {AlertCircle, Link2, RotateCw} from "lucide-react";
import {DropdownMenuItem} from "@/Components/ui/dropdown-menu";
import {useEffect, useState} from "react";
import Modal from "@/Components/Modal";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import {toast} from "sonner";
import {cn} from "@/lib/utils";
import axios from "axios";

interface IProps {
    teacherId : number;
    onClose: () => void;
}

const InviteLinkModal = ({teacherId, onClose,}: IProps) => {


    const [copied, setCopied] = useState(false);
    const [disableTimeout, setDisableTimeout] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getInviteLink();
    }, [])

    const getInviteLink = async () => {
        setIsLoading(true)
        await axios.get("teacher/invitations/"+teacherId)
            .then((data) => {
                const linkInvite = data.data.data.link;
                setInviteLink(linkInvite)
            }).catch((err) => {
                console.info(err)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handleCopyLink = async () => {
        if (!disableTimeout) {
            try {
                await navigator.clipboard.writeText(`${inviteLink}`);
                setDisableTimeout(true);
                setTimeout(() => {
                    setCopied(false);
                    setDisableTimeout(false);
                }, 3000);
                toast.success("Link berhasil di salin")
            } catch (error) {
                toast.error("gagal menyalin")
            }
        }
    };

    return (
        <Modal
            onClose={onClose}
            show={true}
            closeable={!isLoading}
            maxWidth="lg"
        >
            <div className="px-6 py-4">
                <div className="w-full flex items-center justify-center">
                    <h2 className="text-md text-center font-bold">
                        Undang guru melalui tautan
                    </h2>
                </div>

                {
                    isLoading && (
                        <div className="mt-4 flex items-center justify-center">
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-muted-foreground">Generate link ...</span>
                        </div>
                    )
                }

                {
                    !isLoading && (
                        <>
                            <Alert className="mt-3 bg-orange-100 border border-orange-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Perhatian!</AlertTitle>
                                <AlertDescription className="text-gray-700">
                                    Pastikan untuk tidak membagikan tautan ini kepada orang yang tidak diizinkan.
                                </AlertDescription>
                            </Alert>

                            <div className="w-full bg-gray-100 rounded mt-5 px-4 py-3 text-sm text-gray-700 relative flex items-center justify-between">
                                <div className="overflow-hidden">
                        <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[350px]">
                           {inviteLink}
                        </span>
                                </div>
                                <button className={cn("text-sm text-sky-700", disableTimeout && "text-muted-foreground")} onClick={handleCopyLink} disabled={disableTimeout}>
                                    Salink link
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </Modal>
    )
}
export default InviteLinkModal;
