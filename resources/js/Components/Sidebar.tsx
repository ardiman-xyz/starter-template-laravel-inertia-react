import ApplicationLogo from "./ApplicationLogo";
import Logo from "./Logo";
import SidebarRoutes from "./SIdebarRoutes";
import SideBarBottom from "@/Components/SideBarBottom";

const Sidebar = () => {
    return (
        <div className="h-full border-r border-gray-100 flex flex-col overflow-y-auto bg-white">
            <div className="p-6 flex items-center gap-x-2">
                <ApplicationLogo width={40} height={40} clickable={false} />
                <h1 className="font-bold text-gray-700">SUPERVISI</h1>
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto relative">
                <SidebarRoutes />
                <SideBarBottom />
            </div>
        </div>
    );
};

export default Sidebar;
