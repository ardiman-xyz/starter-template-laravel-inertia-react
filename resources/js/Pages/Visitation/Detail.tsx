import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

const DetailVisitationPage = () => {
    return(
        <Authenticated
            breadCrumbs={
                [
                    {
                        title : "Filter",
                        url: "visitation.index",
                        disabled: false
                    },
                    {
                        title : "Supervisi",
                        url: "visitation.filter",
                        disabled: false,
                        params: {
                            year: "2023/2024",
                            smt: "ganjil"
                        }
                    },
                    {
                        title : "Detail",
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title="Supervisi detail" />
            <div>
                visitation detail page
            </div>
        </Authenticated>
    )
}

export default DetailVisitationPage;
