import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Heading from "@/Components/Heading";
import FilterDataTable from "@/Pages/Visitation/_components/filter-data-table";
import { CreateFormAssessment } from "@/Pages/Visitation/_components/create-form-assessment";
import { Assessment } from "@/types/app";

interface FilterProps {
    data: Assessment[];
    year: string;
    semester: string;
}

const FilterPage = ({ data, year, semester }: FilterProps) => {
    return (
        <Authenticated
            breadCrumbs={[
                {
                    title: "Filter",
                    url: "visitation.index",
                    disabled: false,
                },
                {
                    title: "Supervisi",
                    url: "",
                    disabled: true,
                },
            ]}
        >
            <Head title={`Supervisi tahun ${year} ${semester}`} />
            <div className="w-full flex items-center justify-between">
                <Heading
                    title={`Supervisi tahun ${year} - ${semester}`}
                    description="Laporan Supervisi anda"
                />
                <div className="hidden md:flex md:flex-row flex-col  items-center md:gap-x-4 gap-x-0 gap-y-2 md:gap-y-0">
                    <CreateFormAssessment semester={semester} year={year} />
                </div>
            </div>

            <div className="mt-10">
                <FilterDataTable assessments={data} />
            </div>
        </Authenticated>
    );
};

export default FilterPage;
