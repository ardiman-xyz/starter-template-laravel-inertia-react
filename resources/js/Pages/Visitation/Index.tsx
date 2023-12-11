import {Head} from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";

import FilterForm from "@/Pages/Visitation/_components/filter-form";

interface IProps {
    academic_year : {
        id: string;
        year: string;
        semester: string;
    }[]
}

const IndexPage = ({academic_year}: IProps) => {

    return(
        <Authenticated breadCrumbs={
            [
                {
                    title : "Filter",
                    url: "",
                    disabled: true,
                },
            ]
        }>
            <Head title="Visitasi" />

            <Heading
                title="Visitasi"
                description="Manajemen visitasi di akun anda"
            />
            <div className="w-full flex md:flex-row flex-col mt-7">
                <FilterForm academic_year={academic_year}/>
                <div className="md:w-1/2 w-full">
                    List agenda visitasi
                </div>
            </div>
        </Authenticated>
    )
}

export default IndexPage;
