import ApplicationLogo from "@/Components/ApplicationLogo";
import { PropsWithChildren } from "react";

interface GuestProps extends PropsWithChildren {
    showNavbar?: boolean;
}

export default function Guest({ children, showNavbar = true }: GuestProps) {
    return (
        <div className="min-h-screen w-full font-sans">
            {showNavbar && (
                <div className="border-b bg-white">
                    <div className="container flex items-center justify-between h-14 px-4 md:px-6 max-w-6xl mx-auto">
                        <div className="flex items-center gap-x-3">
                            <ApplicationLogo width={40} height={40} />
                            <h1 className="text-xl font-semibold">Supervisi</h1>
                        </div>
                        <nav className="flex items-center gap-4">
                            <a
                                href="/"
                                className="text-sm text-slate-600 hover:text-slate-900 print:hidden"
                            >
                                Home
                            </a>
                            <a
                                href="/tutorial"
                                className="text-sm text-slate-600 hover:text-slate-900 print:hidden"
                            >
                                Tutorial
                            </a>
                            <a
                                href="/auth"
                                className="text-sm text-slate-600 hover:text-slate-900 print:hidden border rounded-sm px-5 py-1"
                            >
                                Login
                            </a>
                        </nav>
                    </div>
                </div>
            )}
            <main>{children}</main>
        </div>
    );
}
