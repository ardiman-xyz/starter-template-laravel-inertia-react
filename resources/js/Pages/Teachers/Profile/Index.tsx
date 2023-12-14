import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Heading from "@/Components/Heading";
import {AvatarForm} from "@/Pages/Teachers/Profile/_components/avatar-form";
import {TeacherProfileEditor} from "@/Pages/Teachers/Profile/_components/teacher-profile-editor";

const IndexProfilePage = () => {
    return (
        <Authenticated>
            <Head title="Profil" />
            <div>
                <Heading
                    title="Profil"
                    description="Manage akun anda"
                />
                <div className="w-full mt-10 flex md:flex-row flex-col ">
                    <AvatarForm />
                    <TeacherProfileEditor />
                </div>
            </div>
        </Authenticated>
    )
}

export default IndexProfilePage;
