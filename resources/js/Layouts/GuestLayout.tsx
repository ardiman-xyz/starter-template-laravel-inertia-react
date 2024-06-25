import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full font-jakarta ">
            <main>{children}</main>
        </div>
    );
}
