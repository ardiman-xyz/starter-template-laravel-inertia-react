import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import Sidebar from "@/Components/Sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
