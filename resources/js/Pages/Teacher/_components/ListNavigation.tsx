import {Archive, UserCircle, UserCog} from "lucide-react";

type TabList = "profile" | "visitation" | "account";

interface ListNavigationProps {
    activeTab: TabList;
    setActiveTab: (tab: TabList) => void;
}

export const ListNavigation = ({activeTab, setActiveTab}: ListNavigationProps) => {
    return (

        <div className="flex flex-col">
            <div
                className={`w-full flex items-center gap-x-2 p-3 cursor-pointer text-sm ${
                    activeTab === 'profile'
                        ? 'bg-sky-200/20 text-sky-700 font-semibold '
                        : 'hover:bg-blue-50 text-slate-500'
                }`}
                onClick={() => setActiveTab('profile')}
            >
                <UserCircle className={`h-4 w-4`} />
                Profil
            </div>
            <div
                className={`w-full flex items-center gap-x-2 p-3 cursor-pointer text-sm  ${
                    activeTab === 'visitation'
                        ? 'bg-sky-200/20 text-sky-700 font-semibold '
                        : 'hover:bg-blue-50 text-slate-500'
                }`}
                onClick={() => setActiveTab('visitation')}
            >
                <Archive className={`h-4 w-4`} />
                Visitasi
            </div>
            <div
                className={`w-full flex items-center gap-x-2 p-3 cursor-pointer text-sm  ${
                    activeTab === 'account'
                        ? 'bg-sky-200/20 text-sky-700 font-semibold '
                        : 'hover:bg-blue-50 text-slate-500'
                }`}
                onClick={() => setActiveTab('account')}
            >
                <UserCog className={`h-4 w-4`} />
                Akun
            </div>
        </div>
    )
}
