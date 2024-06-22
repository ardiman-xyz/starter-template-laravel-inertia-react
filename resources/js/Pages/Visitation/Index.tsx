import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";

import FilterForm from "@/Pages/Visitation/_components/filter-form";

interface IProps {
    data : {
        academic_year: string
    }[]
}

const IndexPage = ({ data }: IProps) => {

    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Filter",
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title="Visitasi" />

            <Heading
                title="Visitasi"
                description="Manajemen visitasi di akun anda"
            />
            <div className="w-full mt-8">
                <FilterForm data={data} />
                <div className="w-full mt-8">List agenda visitasi</div>
            </div>
        </Authenticated>
    );
};

export default IndexPage;
