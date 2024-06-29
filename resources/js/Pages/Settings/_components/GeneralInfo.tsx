import Heading from "@/Components/Heading";
import {GeneralInfoForm} from "./GeneralInfoForm";
import {ImageSchoolForm} from "@/Pages/Settings/_components/ImageSchoolForm";

export const GeneralInfo = () => {
    return (
        <>
            <Heading
                title={"Informasi Umum"}
                description="Lengkapi data dasar sekolah anda."
            />

            <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-x-10 lg:gap-y-0 gap-y-10 mb-10">
                <div>
                    <GeneralInfoForm />
                </div>
                <div>
                    <ImageSchoolForm />
                </div>
            </div>
        </>
    )
}
