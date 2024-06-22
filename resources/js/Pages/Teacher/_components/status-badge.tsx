import {Badge} from "@/Components/ui/badge";

interface StatusBadgeProps {
    isPasswordChange: number;
}

export const StatusBadge = ({isPasswordChange}: StatusBadgeProps) => {
    return (
        <Badge className={`${isPasswordChange ? 'bg-green-200 text-green-800 hover:bg-green-300' : 'bg-red-200 text-red-800 hover:bg-red-200'}`}>
            {isPasswordChange ? 'Bergabung' : 'Belum bergabung'}
        </Badge>
    )
}
