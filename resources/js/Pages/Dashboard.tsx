import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

import {Chart} from "@/Pages/_components/chart";
import {AvatarProfile} from "@/Pages/_components/avatar-profile";
import {PieVariant} from "@/Pages/_components/pie-variant";


export default function Dashboard({ auth }: PageProps) {

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard"/>

            <div className="flex overflow-hidden md:flex-row flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                    <div className="col-span-1 lg:col-span-4">
                        <div className="w-full mb-8">
                            <div
                                className="rounded bg-gradient-to-r from-sky-100 to-sky-50 py-6 px-8 border border-sky-100 mb-10 flex justify-between relative overflow-hidden">
                                <div className="md:w-1/2 w-full">
                                    <h1 className="text-xl font-bold text-sky-800">
                                        SMAN 15 KONSEL
                                    </h1>
                                    <p className="text-sm font-albert text-gray-700">
                                        Selamat datang admin, di aplikasi{" "}
                                        <span className="font-semibold">
                                            sispeng-tk.id
                                        </span>
                                    </p>
                                </div>
                                <div className="absolute md:flex hidden -top-3 right-10">
                                    <img
                                        src="/images/teacher.png"
                                        alt="gambar"
                                        className="h-[180px] w-[180px]"
                                    />
                                </div>
                            </div>
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
