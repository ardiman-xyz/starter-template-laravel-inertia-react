import { FileDown, Trash2 } from "lucide-react";
import { useSupervisionStore } from "@/Context/useSupervisionStore";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

export const AdvanceAction = () => {
    const { selectedItems, hasSelected, clearSelected } = useSupervisionStore();

    const handleBulkDownload = () => {
        const url =
            route("visitation.bulk-report") +
            "?" +
            selectedItems.map((id) => `ids[]=${id}`).join("&");

        window.open(url, "_blank");
    };

    const handleBulkDelete = () => {
        console.log("Deleting:", selectedItems);
    };

    return (
        <div
            className={cn(
                "space-x-2 overflow-hidden",
                hasSelected() ? "w-auto" : "w-0"
            )}
        >
            <div className="flex gap-2">
                {/* <div
                    className={cn(
                        "transition-all duration-300 transform",
                        hasSelected() ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Hapus ({selectedItems.length})</span>
                    </Button>
                </div> */}

                <div
                    className={cn(
                        "transition-all duration-300 transform",
                        hasSelected() ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBulkDownload}
                        className="flex items-center gap-2"
                    >
                        <FileDown className="h-4 w-4" />
                        <span>Unduh ({selectedItems.length})</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
