import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";

export const SchoolProfile = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    const school = auth?.school;

    if (!school) return;

    return (
        <div className="rounded bg-gradient-to-r from-sky-100 to-sky-50 py-6 px-8 border border-sky-100 mb-10 flex justify-between relative overflow-hidden">
            <div className="md:w-1/2 w-full">
                <h1 className="text-xl font-bold text-sky-800">
                    {school.name}
                </h1>
                <p className="text-sm font-albert text-gray-700">
                    Selamat datang admin, di aplikasi{" "}
                    <span className="font-semibold">sispeng-tk.id</span>
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
    );
};
