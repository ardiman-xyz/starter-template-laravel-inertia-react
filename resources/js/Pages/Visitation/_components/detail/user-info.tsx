import {usePage} from "@inertiajs/react";
import {FileLock, Pencil, UserIcon} from "lucide-react";

import {SharedInertiaData} from "@/types/inertia";
import {User} from "@/types/app"
import {Badge} from "@/Components/ui/badge";
import React from "react";
import {Button} from "@/Components/ui/button";
import {FinishModal} from "@/Pages/Visitation/_components/detail/finish-modal";

interface UserInfoProps {
    user: User;
    component_max_score: number;
    assessmentStatus: string;
    total_score: number;
    final_score: {
        evaluate: string;
        final_score: number;
    }
}

export const UserInfo = ({user, component_max_score, total_score, final_score, assessmentStatus}: UserInfoProps) => {

    const {ziggy} = usePage<SharedInertiaData>().props;

    return (
        <div>
            <div className="flex items-center justify-start flex-col">
                <div
                    className="w-[140px] h-[140px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {
                        user?.profile_picture === null ? (
                            <UserIcon className="h-[100px] w-[100px] stroke-gray-400"/>
                        ) : (
                            <div>
                                <img src={ziggy?.url + "/storage/" + user?.profile_picture} alt="profile"/>
                            </div>
                        )
                    }
                </div>
                <h1 className="mt-3 text-gray-700">{user.name}</h1>
            </div>

            <div className="w-full mt-10">
                <div className="flex items-end justify-between">
                    <h1>Detail visitasi</h1>
                    {
                        assessmentStatus === "schedule" ? (
                            <Badge className="bg-orange-600 text-white">
                                Dijadwalkan
                            </Badge>
                        ):(
                            <Badge className="bg-green-600 text-white">
                                Selesai
                            </Badge>
                        )
                    }
                </div>
                <div className="mt-4">
                    <h1>Nilai akhir</h1>
                    <ul className="flex mt-2 flex-col gap-y-2">
                        <li className="flex items-center gap-x-4 text-sm text-gray-600">
                            Skor maksimal <Badge className="rounded-full"> {component_max_score}</Badge>
                        </li>
                        <li className="flex items-center gap-x-4 text-sm text-gray-600">
                            Skor perolehan <Badge className="rounded-full"> {total_score}</Badge>
                        </li>
                        <li className="flex items-center gap-x-4 text-sm text-gray-600">
                            Hasil <Badge className="rounded-full">{final_score.final_score}% ({final_score.evaluate})</Badge>
                        </li>
                    </ul>

                </div>
            </div>

            {
                assessmentStatus === "schedule" && <FinishModal />
            }
        </div>
    )
}
