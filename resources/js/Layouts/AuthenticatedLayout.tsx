import { Toaster } from "sonner";
import { Navbar } from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 font-albert">
            <Toaster />
            <div className="w-full h-[80px] md:pl-72 fixed inset-y-0 bg-white">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full pt-24 container mx-auto max-w-screen-2xl">
                {children}
            </main>
        </div>
    );
}
