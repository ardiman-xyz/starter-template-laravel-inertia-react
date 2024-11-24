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
    assessmentAnswers?: AssessmentAnswer[]; // Tambahkan prop ini
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

    // Check apakah video untuk komponen ini sudah selesai
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

    // Video saat ini harus selesai dan video sebelumnya juga harus selesai
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

    return (
        <TableRow className="relative">
            <TableCell className="border">
                {`${String.fromCharCode(97 + index)}. ${data.name}`}
                {!canInputScore && (
                    <span className="text-xs text-red-500 block">
                        {!isVideoCompleted
                            ? "Selesaikan video ini terlebih dahulu"
                            : "Selesaikan video sebelumnya terlebih dahulu"}
                    </span>
                )}
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
