import {Head} from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";

const AcademicSemesterPage = () => {
    return (
        <Authenticated>
            <Head title="Akademik semester" />
            <Heading
                title="Semester Akademik"
                description="Sistem Pengelolaan dan Semester Akademik"
            />
        </Authenticated>
    )
}

export default AcademicSemesterPage;
