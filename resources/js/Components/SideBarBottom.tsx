import {InfoIcon, LogOut, Settings} from "lucide-react";
import SidebarItem from "@/Components/SIdebarItem";
import {usePage} from "@inertiajs/react";
import {SharedInertiaData} from "@/types/inertia";

const Routes2 = [
    {
        icon: InfoIcon,
        label: "Informasi",
        href: "/information",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: Settings,
        label: "Pengaturan",
        href: "/settings",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: LogOut,
        label: "Keluar",
        href: "/logout",
        requiredRoles: ["Headmaster", "Teacher"],
    },
];

const SideBarBottom = () => {

    const { auth } = usePage<SharedInertiaData>().props;


    return (
        <div className="absolute bottom-0 left-0 w-full p-4 pb-6">
            <div className="flex flex-col w-full mt-1">
                {Routes2.map(
                    (route, index) =>
                        (!route.requiredRoles ||
                            (auth &&
                                route.requiredRoles.some(
                                    (role) =>
                                        auth.user && auth.roles.includes(role)
                                ))) && (
                            <SidebarItem
                                key={index}
                                icon={route.icon}
                                href={route.href}
                                label={route.label}
                                requiredRoles={route.requiredRoles}
                            />
                        )
                )}
            </div>
        </div>
    )
}

export default SideBarBottom;
