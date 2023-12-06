import Social from "@/Layouts/SocialAuthLayout";
import {Head} from "@inertiajs/react";
import {Unlock} from "lucide-react";
import { Link } from '@inertiajs/react'
import { MdEmail } from "react-icons/md";

import GoogleAction from "./_components/google-action";

const LoginSocialPage = () => {
    return (
        <Social>
            <Head title="Autentikasi" />
            <div className="flex items-center gap-x-2 bg-[#BBD5C1] px-3 py-1 rounded justify-center">
                <Unlock className="h-4 w-4 text-green-900 stroke-green-700" />
                <p className="text-green-700 font-semibold text-sm">Log In</p>
            </div>
            <h1 className="mt-5 font-extrabold text-3xl">Masuk ke supervisi</h1>
            <p className="text-muted-foreground mt-2 text-sm">Baru di supervisi ?
                <Link href="/" className="text-blue-500 hover:underline ml-1">Register</Link>
            </p>

            <div className="w-full flex flex-col items-center mt-14 justify-center gap-y-3">
                <GoogleAction />
                <div className="w-[313px] bg-gray-100 border border-gray-300 px-4 py-3 rounded cursor-pointer flex items-center justify-center hover:bg-gray-200">
                    <MdEmail className="w-5 h-5 fill-gray-500 stroke-white" />
                    <p className="text-sm font-semibold ml-2 text-gray-700">Masuk dengan email</p>
                </div>
            </div>
        </Social>
    )
}

export default LoginSocialPage;
