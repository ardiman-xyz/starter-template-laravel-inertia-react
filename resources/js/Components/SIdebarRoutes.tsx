import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";
import {
    ClipboardList,
    Dot,
    Layout,
    ListRestart,
    Settings,
} from "lucide-react";
import SidebarItem from "./SIdebarItem";

const Routes = [
    {
        icon: Layout,
        label: "Dasbor",
        href: "/dashboard",
        requiredRoles: ["Headmaster", "Student", "Finance"],
    },
    {
        icon: Settings,
        label: "RAB Ujian",
        href: "/faculty/rab",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: ListRestart,
        label: "Transaksi",
        children: [
            {
                icon: ClipboardList,
                label: "Pengajuan Judul",
                href: "/admin/research-proposals",
                requiredRoles: ["Headmaster"],
            },
        ],
    },

    {
        icon: ListRestart,
        label: "Pengaturan",
        children: [
            {
                icon: Dot,
                label: "Users",
                href: "/users",
                requiredRoles: ["Headmaster", "Finance"],
            },
            {
                icon: Dot,
                label: "Roles",
                href: "/roles",
                requiredRoles: ["Headmaster", "Finance"],
            },
        ],
    },
];

const SidebarRoutes = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    return (
        <div className="flex flex-col w-full">
            {Routes.map(
                (route, index) =>
                    (!route.requiredRoles ||
                        (auth &&
                            route.requiredRoles.some(
                                (role) => auth.user && auth.roles.includes(role)
                            ))) && (
                        <SidebarItem
                            key={index}
                            icon={route.icon}
                            href={route.href}
                            label={route.label}
                            children={route.children}
                            requiredRoles={route.requiredRoles}
                        />
                    )
            )}
        </div>
    );
};

export default SidebarRoutes;
