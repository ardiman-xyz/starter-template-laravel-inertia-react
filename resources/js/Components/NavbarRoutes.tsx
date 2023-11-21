import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export const NavbarRoutes = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex gap-x-2 ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                    <DropdownMenuLabel>
                        <div>{auth.user ? auth.user.name : "Guest"}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            router.post("/logout");
                        }}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
