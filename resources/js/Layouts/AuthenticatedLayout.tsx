import React from "react";
import { Toaster } from "sonner";

import Sidebar from "@/Components/Sidebar";
import { MobileSidebar } from "@/Components/MobileSidebar";
import { NavbarRoutes } from "@/Components/NavbarRoutes";
import { BreadCrumb } from "@/Components/BreadCrumb";

type IProps = {
    children: React.ReactNode;
    breadCrumbs?:
        | {
              title: string;
              url: string;
              disabled?: boolean;
              params?: Object;
          }[]
        | undefined;
};

export default function Authenticated({ children, breadCrumbs }: IProps) {
    return (
        <div className="min-h-screen font-sans bg-white">
            <Toaster richColors />
            <div className="w-full h-[80px] md:pl-64 fixed inset-y-0 bg-white z-50">
                <div className="w-full p-4 border-b h-full flex items-center bg-white z-50">
                    {breadCrumbs && <BreadCrumb breadCrumbs={breadCrumbs} />}
                    <MobileSidebar />
                    <NavbarRoutes />
                    {/*<Navbar />*/}
                </div>
            </div>
            <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-64 h-full pt-24 container mx-auto max-w-screen-2xl">
                {children}
            </main>
        </div>
    );
}
