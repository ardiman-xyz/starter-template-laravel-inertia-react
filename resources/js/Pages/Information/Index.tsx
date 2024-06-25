import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

const InformationIndexPage = () => {
    return (
        <Authenticated>
            <Head title="Information" />
            <div className="w-full">
                <img src="/svg/diagram-flow-sistem.svg" alt="diagram"/>
            </div>
        </Authenticated>
    )
}

export default InformationIndexPage;
