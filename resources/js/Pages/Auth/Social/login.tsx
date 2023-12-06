import Social from "@/Layouts/SocialAuthLayout";
import {Head} from "@inertiajs/react";
import {Unlock} from "lucide-react";
import { Link } from '@inertiajs/react'

import GoogleActionLogin from "./_components/google-action";
import AuthFomAction from "@/Pages/Auth/Social/_components/auth-fom";
import {useCallback, useState} from "react";

type Variant = "Login" | "Register";

const LoginSocialPage = () => {

    const [variant, setVariant] = useState<Variant>("Login");

    const toggleVariant = useCallback(() => {
        if (variant === "Login") {
            setVariant("Register");
        } else {
            setVariant("Login");
        }
    }, [variant]);

    return (
        <Social>
            <Head title="Autentikasi" />
            <div className="flex items-center gap-x-2 bg-[#BBD5C1] px-3 py-1 rounded justify-center">
                <Unlock className="h-4 w-4 text-green-900 stroke-green-700" />
                <p className="text-green-700 font-semibold text-sm">Log In</p>
            </div>
            <h1 className="mt-5 font-extrabold text-3xl">Masuk ke supervisi</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                {
                    variant === "Login" ? "Baru di supervisi ?" : "Sudah punya akun ?"
                }

                <span onClick={toggleVariant} className="text-blue-500 hover:underline ml-1 cursor-pointer">
                    {
                        variant === "Login" ? "Register" : "Login"
                    }
                </span>
            </p>

            <AuthFomAction variant={variant} />

            <div className="w-full flex flex-col items-center mt-6 justify-center gap-y-3">
                <GoogleActionLogin />
            </div>
        </Social>
    )
}

export default LoginSocialPage;
