import Heading from "@/Components/Heading";
import {AccountForm} from "@/Pages/Settings/_components/AccountForm";

export const AccountSetting = () => {
    return (
        <>
            <Heading
                title="Informasi Akun"
                description="Kelola dan amankan informasi akun Anda di sini"
            />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 lg:gap-y-0 gap-y-10 mt-10">
                <div>
                    <AccountForm />
                </div>
                <div>
                    kaan
                </div>
            </div>
        </>
    )
}
