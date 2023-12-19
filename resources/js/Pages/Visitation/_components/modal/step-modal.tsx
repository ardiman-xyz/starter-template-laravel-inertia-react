import React, {useCallback, useState} from "react";
import Modal from "@/Components/Modal";
import {Button} from "@/Components/ui/button";
import {RotateCw} from "lucide-react";

interface StepModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    isLoading: boolean
}

export const StepModal = (
    {
        isOpen,
        onClose,
        onSubmit,
        title,
        body,
        actionLabel,
        footer,
        disabled,
        secondaryAction,
        secondaryActionLabel,
        isLoading
    }: StepModalProps
) => {

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <Modal
                onClose={onClose}
                show={isOpen}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4 max-h-[600px] w-full min-h-[600px] font-albert">
                    <div className="w-full">
                        <h2 className="text-md text-center font-bold">
                            Buat supervisi baru
                        </h2>
                    </div>
                    {
                        body
                    }
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-x-3 border-t bg-white">
                        <Button onClick={onClose} className="w-full" size={"lg"} variant="outline">
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="w-full" size={"lg"}
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Konfirmasi
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
