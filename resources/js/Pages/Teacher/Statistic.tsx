import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Avatar} from "./_components/Avatar";
import {ListNavigation} from "@/Pages/Teacher/_components/ListNavigation";
import {useState} from "react";
import {GeneralInfo} from "@/Pages/Teacher/_components/GeneralInfo";
import {Visitation} from "@/Pages/Teacher/_components/Visitation";
import {Account} from "@/Pages/Teacher/_components/Account";
import {Separator} from "@/Components/ui/separator";
import {User} from "@/types/app";
import Heading from "@/Components/Heading";


type TabList = "profile" | "visitation" | "account";

interface StatisticProps {
    user: User;
}

const Statistic = ({user}: StatisticProps) => {

    const breadCrumbs = [
        {
            title: "Guru",
            url: "teacher.index",
            disabled: false,
        },
        {
            title: user.name,
            url: "visitation.filter",
            disabled: true,
        },

    ]

    const [activeTab, setActiveTab] = useState<TabList>("profile");

    const handleTabChange = (tab: TabList) => {
        setActiveTab(tab)
    }

    return (
        <Authenticated breadCrumbs={breadCrumbs}>
            <Head title={user.name} />

            <Heading title={user.name} className="mb-6" />

            <div className="w-full overflow-x-auto">
                <div className="flex gap-6" style={{ minWidth: '1024px' }}>
                    <div className="w-1/4 flex flex-col gap-y-4" style={{ minWidth: '256px' }}>
                        {/*<Avatar user={user} />*/}
                        {/*<Separator className="my-3" />*/}
                        <ListNavigation activeTab={activeTab} setActiveTab={handleTabChange} />
                    </div>
                    <div className="w-3/4" style={{ minWidth: '768px' }}>
                        { activeTab === "profile" && <GeneralInfo id={user.id} />}
                        { activeTab === "visitation" && <Visitation />}
                        { activeTab === "account" && <Account />}
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Statistic
