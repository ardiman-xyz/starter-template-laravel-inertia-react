import { TableCell, TableRow } from "@/Components/ui/table";
import React, { useState } from "react";
import axios from "axios";

import { Component, ComponentDetail } from "@/types/app";

import useVisitationContextNew from "@/Context/useVisitationContextNew";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface IProps {
    index: number;
    data: ComponentDetail;
    instrument: Component;
}

type SelectedOption = {
    instrument_id: number;
    item_id: number;
    value: string;
};

export const TableItemDetail = ({ data, index, instrument }: IProps) => {
    const { assessmentId } = useVisitationContextNew();

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            <TableCell className="border">{`${String.fromCharCode(
                97 + index
            )}. ${data.name}`}</TableCell>
            <TableCell className="text-center border">
                {data.scored.status && data.scored.score === 1 ? (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="1"
                        checked={data.scored.status && data.scored.score === 1}
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                ) : (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="1"
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                )}
            </TableCell>
            <TableCell className="text-center border">
                {data.scored.status && data.scored.score === 2 ? (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="2"
                        checked={data.scored.status && data.scored.score === 2}
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                ) : (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="2"
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                )}
            </TableCell>
            <TableCell className="text-center border">
                {data.scored.status && data.scored.score === 3 ? (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="3"
                        checked={data.scored.status && data.scored.score === 3}
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                ) : (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="3"
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                )}
            </TableCell>
            <TableCell className="text-center border">
                {data.scored.status && data.scored.score === 4 ? (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="4"
                        checked={data.scored.status && data.scored.score === 4}
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                ) : (
                    <input
                        type="radio"
                        name={`item-${data.id}-${data.id}`}
                        value="4"
                        onChange={(e) =>
                            handleRadioChange(e, instrument.id, data.id)
                        }
                        disabled={isLoading}
                    />
                )}
            </TableCell>
        </TableRow>
    );
};
