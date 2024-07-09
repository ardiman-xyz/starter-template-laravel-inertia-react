import Authenticated from "@/Layouts/AuthenticatedLayout";
import { GeneralInfo } from "@/Pages/Settings/_components/GeneralInfo";
import { Head } from "@inertiajs/react";
import { Separator } from "@/Components/ui/separator";
import { AccountSetting } from "@/Pages/Settings/_components/Account";

const SettingPage = () => {
    return (
        <Authenticated>
            <Head title="Pengaturan" />
            <h1 className="text-3xl font-bold">Pengaturan</h1>

            <div className=" ">
                <div className="flex flex-col gap-y-4 mt-10">
                    <GeneralInfo />
                </div>
                <Separator />
                <div className="mt-10 mb-20">
                    <AccountSetting />
                </div>
            </div>
        </Authenticated>
    );
};

export default SettingPage;
