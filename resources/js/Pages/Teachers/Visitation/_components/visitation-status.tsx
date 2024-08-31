import { Info } from "lucide-react";
import React, { forwardRef } from "react";

import { Assessment } from "@/types/app";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Hint } from "@/Components/Hint";
import { formatDate, formatIndonesianDateTime } from "@/helper";
import { Button } from "@/Components/ui/button";

interface IProps {
    data: Assessment;
}

const VisitationStatus = ({ data }: IProps) => {
    const handlePopoverClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
                {data.status === "schedule" && (
                    <div className="h-3 w-3 rounded-full bg-red-600 animate-ping " />
                )}
                <div className="capitalize italic">
                    {data.status === "schedule" ? "Dijadwalkan" : "Selesai"}
                </div>
            </div>
            <div>
                {/* <Popover>
                    <PopoverTrigger onClick={handlePopoverClick}>
                        <Hint
                            side="right"
                            description="Klik informasi"
                            sideOffset={2}
                        >
                            <Button size="sm" variant="ghost">
                                <Info className="h-4 w-4" />
                            </Button>
                        </Hint>
                    </PopoverTrigger>
                    <PopoverContent side="right">
                        <span className="text-muted-foreground">
                            Diselesaikan :{" "}
                        </span>
                        <p className="text-sm">
                            {formatIndonesianDateTime(data.finished_at)}
                        </p>
                    </PopoverContent>
                </Popover> */}
            </div>
        </div>
    );
};

export default VisitationStatus;
