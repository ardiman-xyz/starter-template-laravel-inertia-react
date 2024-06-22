import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";
import {
    BookLock,
    ClipboardCheck,
    Inbox, InfoIcon,
    Layout,
    LibraryBig,
    Play, Settings,
    UserCog,
    Users,
} from "lucide-react";
import SidebarItem from "./SIdebarItem";
import { Separator } from "./ui/separator";

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
        label: "Visitasi",
        href: "/visitation",
        requiredRoles: ["Headmaster"],
    },

    {
        icon: Layout,
        label: "Dasbor",
        href: "/teacher/dashboard",
        requiredRoles: ["Teacher"],
    },
    {
        icon: ClipboardCheck,
        label: "Visitasi",
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

const Routes2 = [
    {
        icon: InfoIcon,
        label: "Informasi",
        href: "/booker",
        requiredRoles: ["Headmaster", "Teacher"],
    },
    {
        icon: Settings,
        label: "Pengaturan",
        href: "/booker",
        requiredRoles: ["Headmaster"],
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
            <Separator className="my-2" />

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
        </>
    );
};

export default SidebarRoutes;
