import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

import {Chart} from "@/Pages/_components/chart";


export default function Dashboard({ auth }: PageProps) {

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex overflow-hidden md:flex-row flex-col">
                <div className="w-full mb-32">
                    <div className="rounded bg-gradient-to-r from-sky-100 to-sky-50 py-6 px-8 border border-sky-100 mb-10 flex justify-between relative overflow-hidden">
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

                   <Chart />
                </div>
                <div className="w-96">kanan</div>
            </div>
        </AuthenticatedLayout>
    );
}
