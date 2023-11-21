import { ChevronDown, Dot, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import { SharedInertiaData } from "@/types/inertia";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href?: string | null;
    children?: SidebarItemProps[];
    requiredRoles?: string[];
}

const SidebarItem = ({
    icon: Icon,
    label,
    href,
    children,
    requiredRoles,
}: SidebarItemProps) => {
    const { auth } = usePage<SharedInertiaData>().props;

    const page = usePage();
    const isActive = page.url.startsWith(href || label);

    const isSubmenuInitiallyOpen =
        children?.some((child) =>
            page.url.startsWith(child.href || child.label)
        ) || false;

    const [isSubmenuOpen, setSubmenuOpen] = useState(isSubmenuInitiallyOpen);

    useEffect(() => {
        setSubmenuOpen(isSubmenuInitiallyOpen);
    }, [page.url]);

    const accessibleChildren: any =
        children &&
        children.filter(
            (childRoute) =>
                !childRoute.requiredRoles ||
                childRoute.requiredRoles.some(
                    (role) => auth!.user && auth!.roles.includes(role)
                )
        );

    if (children && accessibleChildren.length === 0) {
        return null;
    }

    return (
        <>
            <Link
                href={href || "#"}
                className={cn(
                    "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all ease-in-out hover:text-slate-600 hover:bg-slate-300/20 ",
                    isActive &&
                        "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                )}
                onClick={(e) => {
                    if (children) {
                        e.preventDefault();
                        setSubmenuOpen(!isSubmenuOpen);
                    }
                }}
            >
                <div className={`flex items-center gap-x-2 py-4`}>
                    <Icon
                        size={22}
                        className={cn(
                            "text-slate-500",
                            isActive && "text-sky-700"
                        )}
                    />
                    {label}
                </div>
                <div
                    className={cn(
                        "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                        isActive && "opacity-100"
                    )}
                />
                {children && <ChevronDown className="h-5 w-5 mr-3" />}
            </Link>

            <div className="pl-5">
                {children &&
                    isSubmenuOpen &&
                    children.map(
                        (childRoute, i) =>
                            (!childRoute.requiredRoles ||
                                childRoute.requiredRoles.some(
                                    (role) =>
                                        auth!.user && auth!.roles.includes(role)
                                )) && (
                                <SidebarItem
                                    key={`child-${i}`}
                                    icon={childRoute.icon}
                                    href={childRoute.href}
                                    label={`${childRoute.label}`}
                                />
                            )
                    )}
            </div>
        </>
    );
};

export default SidebarItem;
