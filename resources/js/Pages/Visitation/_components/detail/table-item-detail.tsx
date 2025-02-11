import { TableCell, TableRow } from "@/Components/ui/table";
import React, { useState } from "react";
import axios from "axios";
import { AssessmentAnswer, Component, ComponentDetail } from "@/types/app";
import useVisitationContextNew from "@/Context/useVisitationContextNew";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface IProps {
    index: number;
    data: ComponentDetail;
    instrument: Component;
    assessmentAnswers?: AssessmentAnswer[];
}

type SelectedOption = {
    instrument_id: number;
    item_id: number;
    value: string;
};

export const TableItemDetail = ({
    data,
    index,
    instrument,
    assessmentAnswers = [],
}: IProps) => {
    const { assessmentId } = useVisitationContextNew();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isVideoCompleted =
        assessmentAnswers?.find(
            (answer) => Number(answer.component_id) === Number(instrument.id)
        )?.is_done ?? false;

    const currentIndex = assessmentAnswers.findIndex(
        (a) => Number(a.component_id) === Number(instrument.id)
    );

    const previousVideosCompleted =
        currentIndex === 0 ||
        assessmentAnswers
            .slice(0, currentIndex)
            .every((answer) => answer.is_done);

    const canInputScore = isVideoCompleted && previousVideosCompleted;

    const handleRadioChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        instrumentId: number,
        itemId: number
    ) => {
        const data: SelectedOption = {
            instrument_id: instrumentId,
            item_id: itemId,
            value: e.target.value,
        };

        setIsLoading(true);

        axios
            .post(`/visitation/${assessmentId}/score`, data)
            .then(({ data }) => {
                router.reload();
                toast.success("saved");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Gagal, terjadi kesalahan");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Format the text to ensure proper alignment and indentation
    const formatItemText = (index: number, text: string) => {
        const letter = String.fromCharCode(97 + index);
        return (
            <div className="flex">
                <span className="w-6">{letter}.</span>
                <span className="flex-1">{text}</span>
            </div>
        );
    };

    return (
        <TableRow className="relative">
            <TableCell className="border p-2">
                <div className="space-y-1">
                    <div className="text-sm">
                        {formatItemText(index, data.name)}
                    </div>
                    {!canInputScore && (
                        <div className="text-xs text-red-500 ml-6">
                            {!isVideoCompleted
                                ? "Selesaikan video ini terlebih dahulu"
                                : "Selesaikan video sebelumnya terlebih dahulu"}
                        </div>
                    )}
                </div>
            </TableCell>
            {[1, 2, 3, 4].map((score) => (
                <TableCell key={score} className="text-center border">
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value={score}
                        checked={
                            data.scored.status && data.scored.score === score
                        }
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading || !canInputScore}
                        className={
                            !canInputScore
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }
                    />
                </TableCell>
            ))}
        </TableRow>
    );
};
