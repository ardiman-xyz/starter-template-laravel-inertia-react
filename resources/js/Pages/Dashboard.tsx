import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

import {Chart} from "@/Pages/_components/chart";
import {AvatarProfile} from "@/Pages/_components/avatar-profile";
import {PieVariant} from "@/Pages/_components/pie-variant";
import {SchoolProfile} from "@/Pages/_components/school-profile";


export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard"/>

            <div className="flex overflow-hidden md:flex-row flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                    <div className="col-span-1 lg:col-span-4">
                        <div className="w-full mb-8">
                            <SchoolProfile />
                            <Chart/>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                       <div className="hidden lg:flex mb-10">
                           <AvatarProfile />
                       </div>
                        <div className="">
                            <PieVariant />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
