import React from "react";
import { Toaster } from "sonner";

import { Navbar } from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen font-albert">
            <Toaster richColors />
            <div className="w-full h-[80px] md:pl-64 fixed inset-y-0 bg-white">
                <Navbar />
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
