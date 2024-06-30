import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, router, usePage } from "@inertiajs/react";
import {SharedInertiaData} from "@/types/inertia";

export const NavbarRoutes = () => {
    const { auth, ziggy } = usePage<SharedInertiaData>().props;
    return (
        <div className="flex gap-x-2 ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        {
                            auth?.user?.profile_picture !== null && (
                                <AvatarImage src={ziggy?.url+"/storage/"+auth?.user?.profile_picture} />
                            )
                        }
                        <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                    <DropdownMenuLabel>
                        <div>{auth?.user ? auth?.user.name : "Guest"}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            router.get("/logout");
                        }}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
