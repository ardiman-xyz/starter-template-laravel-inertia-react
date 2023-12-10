import {Inbox} from "lucide-react";

export const DataEmpty = () => {
    return (
        <div className="flex items-center flex-col">
            <Inbox className="h-6 w-6 stroke-gray-500" />
            <p className="text-muted-foreground text-sm">Data belum ada</p>
        </div>
    )
}
