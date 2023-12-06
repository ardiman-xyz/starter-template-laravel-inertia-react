import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Social({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen font-albert">
            <div className="w-full h-[78px] px-10 flex items-center gap-x-2">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                <h2 className="text-xl font-bold ">SUPERVISI</h2>
            </div>

            <div className="w-full container mx-auto max-w-5xl flex flex-col items-center justify-center mt-8">
                {children}
            </div>
        </div>
    );
}
