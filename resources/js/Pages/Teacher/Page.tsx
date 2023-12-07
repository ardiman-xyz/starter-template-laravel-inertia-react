import {Head} from "@inertiajs/react";

import Heading from "@/Components/Heading";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CreateModal from "./_components/create-modal";
import {User} from "@/types/app";
import {DataTable} from "./_components/data-table";
import { columns } from "./_components/columns"

interface IndexPops {
    teachers: User [];
}

const TeacherPage = ({teachers}: IndexPops) => {

    return(
        <Authenticated>
            <Head title="Guru" />
            <div>
                <Heading
                    title="Guru"
                    description="Manajemen data guru"
                />
                <div className="mt-7">
                    <DataTable columns={columns} data={teachers} />
                </div>
            </div>
        </Authenticated>
    )
}

export default TeacherPage;
