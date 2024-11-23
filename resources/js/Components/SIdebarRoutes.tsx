import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";
import {
    BookLock,
    Calendar,
    ClipboardCheck,
    Inbox,
    Layout,
    LibraryBig,
    UserCog,
    Users,
} from "lucide-react";
import SidebarItem from "./SIdebarItem";

const Routes = [
    {
        icon: Layout,
        label: "Dasbor",
        href: "/dashboard",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: Users,
        label: "Guru",
        href: "/teacher",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: Inbox,
        label: "Tahun Akademik",
        href: "/academic-semester",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: BookLock,
        label: "Instrumen & nilai",
        href: "/instruments",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: LibraryBig,
        label: "Supervisi",
        href: "/visitation",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: Calendar,
        label: "Kalender",
        href: "/calendar",
        requiredRoles: ["Headmaster"],
    },

    {
        icon: Layout,
        label: "Dasbor",
        href: "/teachers/dashboard",
        requiredRoles: ["Teacher"],
    },
    {
        icon: ClipboardCheck,
        label: "Supervisi",
        href: "/teachers/visitation",
        requiredRoles: ["Teacher"],
    },
    {
        icon: UserCog,
        label: "Profil",
        href: "/teachers/profile",
        requiredRoles: ["Teacher"],
    },
];

const SidebarRoutes = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    return (
        <>
            <div className="flex flex-col w-full">
                {Routes.map(
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
                                // children={route.children}
                                requiredRoles={route.requiredRoles}
                            />
                        )
                )}
            </div>
        </>
    );
};

export default SidebarRoutes;
