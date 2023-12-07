import { SharedInertiaData } from "@/types/inertia";
import { usePage } from "@inertiajs/react";
import {
    BookLock,
    Layout, LibraryBig,
    Users,
} from "lucide-react";
import SidebarItem from "./SIdebarItem";

const Routes = [
    {
        icon: Layout,
        label: "Dasbor",
        href: "/dashboard",
        requiredRoles: ["Headmaster", "Teacher"],
    },
    {
        icon: Users,
        label: "Guru",
        href: "/teacher",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: BookLock,
        label: "Instrumen & nilai",
        href: "/instrumental",
        requiredRoles: ["Headmaster"],
    },
    {
        icon: LibraryBig,
        label: "Visitasi",
        href: "/visitation",
        requiredRoles: ["Headmaster"],
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
                            // children={route.children}
                            requiredRoles={route.requiredRoles}
                        />
                    )
            )}
        </div>
    );
};

export default SidebarRoutes;
