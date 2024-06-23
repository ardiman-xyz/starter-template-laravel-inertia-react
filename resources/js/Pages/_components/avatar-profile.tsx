
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"


export const AvatarProfile = () => {
    return (
        <div className="w-full bg-[#0369A1] py-6 px-6 text-white rounded-md flex items-center gap-x-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
                <h3 className="text-md font-semibold truncate w-[180px]">Dikman Maheng, S.T., M.Eng</h3>
                <p className="text-sm">Kepala Sekolah</p>
            </div>
        </div>
    )
}
