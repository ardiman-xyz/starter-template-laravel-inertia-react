import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";

export const AvatarProfile = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    const school = auth?.school;

    if (!school) return;

    return (
        <div className="w-full bg-[#0369A1] py-6 px-6 text-white rounded-md flex items-center gap-x-2">
            <Avatar>
                <AvatarImage src={"/storage/" + auth?.user?.profile_picture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
                <h3 className="text-md font-semibold truncate w-[250px]">
                    {school.leader_name}
                </h3>
                <p className="text-sm">Kepala Sekolah</p>
            </div>
        </div>
    );
};
