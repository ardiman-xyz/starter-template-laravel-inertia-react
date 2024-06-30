import {AccountForm} from "@/Pages/Settings/_components/AccountForm";
import {Separator} from "@/Components/ui/separator";
import {Personalnfo} from "@/Pages/Settings/_components/Personalnfo";

export const AccountSetting = () => {
    return (
        <>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 lg:gap-y-0 gap-y-10">
                <div>
                    <Personalnfo />
                    <Separator className="my-10" />
                    <AccountForm />
                </div>
                <div>
                    kaan
                </div>
            </div>
        </>
    )
}
