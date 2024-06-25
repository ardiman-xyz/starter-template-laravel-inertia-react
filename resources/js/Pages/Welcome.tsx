import Guest from "@/Layouts/GuestLayout";
import {Head} from "@inertiajs/react";

const Welcome = () => {
    return (
        <Guest>
            <Head title="Home" />
            <div>
                welcome
            </div>
        </Guest>
    )
}

export default Welcome;
