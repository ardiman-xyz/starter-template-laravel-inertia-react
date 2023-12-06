import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SIdebarRoutes";

const Sidebar = () => {
    return (
        <div className="h-full border-r border-gray-100 flex flex-col overflow-y-auto bg-white">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default Sidebar;
