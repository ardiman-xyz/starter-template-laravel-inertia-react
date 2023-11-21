import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "./NavbarRoutes";

export const Navbar = () => {
    return (
        <div className="w-full p-4 border-b h-full flex items-center bg-white  shadow-sm z-50">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
};
