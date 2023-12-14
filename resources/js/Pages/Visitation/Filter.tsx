import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import Heading from "@/Components/Heading";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Button} from "@/Components/ui/button";
import FilterDataTable from "@/Pages/Visitation/_components/filter-data-table";
import {CreateFormAssessment} from "@/Pages/Visitation/_components/create-form-assessment";
import {Assessment} from "@/types/app";


interface FilterProps {
    data: Assessment[],
    year: string;
    semester: string;
}

const FilterPage = ({data, year, semester}: FilterProps) => {

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
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title="Visitasi tahun 2023/2024 ganjil" />
            <div className="w-full flex items-center justify-between">
                <Heading
                    title="Visitasi tahun 2023/2024 ganjil"
                    description="Laporan visitasi anda"
                />
                <div
                    className="hidden md:flex md:flex-row flex-col  items-center md:gap-x-4 gap-x-0 gap-y-2 md:gap-y-0">
                    <Select defaultValue={"2024/2025"}>
                        <SelectTrigger className="md:w-[180px] w-full">
                            <SelectValue  placeholder="Tahun akademik"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                            <SelectItem value="2025/2026">2025/2026</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue={"ganjil"}>
                        <SelectTrigger className="md:w-[180px] w-full">
                            <SelectValue placeholder="Semester"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ganjil">Ganjil</SelectItem>
                            <SelectItem value="genap">Genap</SelectItem>
                        </SelectContent>
                    </Select>

                       <Link href={route("visitation.filter", 45)}>
                           <Button className="px-7 w-full md:w-max" variant={"outline"}>
                               Filter
                           </Button>
                       </Link>
                      <CreateFormAssessment semester={semester} year={year} />
                </div>
            </div>

            <div className="mt-10">
                <FilterDataTable assessments={data} />
            </div>

        </Authenticated>
    )
}

export default FilterPage
