import Social from "@/Layouts/SocialAuthLayout";
import {Head, Link} from "@inertiajs/react";
import { Unlock, XCircle} from "lucide-react";
import {Button} from "@/Components/ui/button";

const InviteNotValid = () => {
    return (
       <Social>
           <Head title="Error invalid link" />
           <div>
               <div className="flex items-center gap-x-2 bg-red-300 px-3 py-1 rounded justify-center">
                   <XCircle className="h-4 w-4 stroke-red-700" />
                   <p className="text-red-700 font-semibold text-sm">404 Error</p>
               </div>
           </div>
           <h1 className="mt-5 font-extrabold text-3xl">Invite not found</h1>
            <p className="text-center mt-3 text-muted-foreground">We couldn’t locate this invite. <br/> Please double check the invite URL or request a new invite.</p>
           <Link href={route("social.auth.google")}>
               <Button className="mt-10" size="lg">
                   Kembali ke login
               </Button>
           </Link>
       </Social>
    )
}

export default InviteNotValid;
