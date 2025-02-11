import Logo from "./Logo";
import SidebarRoutes from "./SIdebarRoutes";
import SideBarBottom from "@/Components/SideBarBottom";

const Sidebar = () => {
    return (
        <div className="h-full border-r border-gray-100 flex flex-col overflow-y-auto bg-white">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto relative">
                <SidebarRoutes />
                <SideBarBottom />
            </div>
        </div>
    );
};

export default Sidebar;
