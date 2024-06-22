import {Head} from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {DataTable} from "@/Pages/AcademicSemester/_components/data-table";
import {columns} from "@/Pages/AcademicSemester/_components/columns";

const AcademicSemesterPage = () => {
    return (
        <Authenticated>
            <Head title="Akademik semester"/>
            <Heading
                title="Semester Akademik"
                description="Sistem Pengelolaan dan Semester Akademik"
            />

            <div className="mt-7">
                <DataTable columns={columns} data={[]}/>
            </div>
        </Authenticated>
    )
}

export default AcademicSemesterPage;
