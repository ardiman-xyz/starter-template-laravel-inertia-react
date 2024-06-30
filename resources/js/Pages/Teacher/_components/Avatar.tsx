import {UserIcon} from "lucide-react";
import React from "react";
import {StatusBadge} from "@/Pages/Teacher/_components/status-badge";
import {User} from "@/types/app";

interface AvatarProps {
    user: User
}

export const Avatar = ({user}: AvatarProps) => {

    return (
        <div>
            <div className="flex items-center justify-start flex-col">
                <div
                    className="w-[140px] h-[140px] bg-gray-200 rounded-full flex  overflow-hidden">
                    {
                        user?.profile_picture === null ? (
                            <UserIcon className="h-[100px] w-[100px] stroke-gray-400"/>
                        ) : (
                            <div>
                                <img src={"/storage/" + user?.profile_picture} alt="profile"/>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col justify-center items-center gap-y-1">
                    <h1 className="mt-3 text-gray-700 font-semibold">{user.name}</h1>
                    <StatusBadge isPasswordChange={1} />
                </div>
            </div>

        </div>
    )
}
