import { FunctionComponent, ComponentType } from 'react';
import { Inbox } from "lucide-react";

interface DataEmptyProps {
    message?: string;
    Icon?: ComponentType;
    iconClass?: string;
    messageClass?: string;
}

export const DataEmpty: FunctionComponent<DataEmptyProps> = ({
     message = "Data belum ada",
     Icon = Inbox,
     iconClass = "h-6 w-6 stroke-gray-500",
     messageClass = "text-muted-foreground text-sm"
 }) => {
    return (
        <div className="flex items-center flex-col">
            <Icon className={iconClass} />
            <p className={messageClass}>{message}</p>
        </div>
    );
}
