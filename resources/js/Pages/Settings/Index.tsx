import Authenticated from "@/Layouts/AuthenticatedLayout";
import {GeneralInfo} from "@/Pages/Settings/_components/GeneralInfo";
import {Head} from "@inertiajs/react";

const SettingPage = () => {
    return (
        <Authenticated>
            <Head title="Pengaturan"/>
            <h1 className="text-3xl font-bold">Pengaturan</h1>
            <div className="flex flex-col gap-y-4 mt-10">
                <GeneralInfo/>
            </div>
        </Authenticated>
    )
}

export default SettingPage;
