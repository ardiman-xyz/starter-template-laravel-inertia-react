import {PasswordUpdate} from "@/Pages/Teachers/Profile/_components/password-update";
import {InformationForm} from "@/Pages/Teachers/Profile/_components/information-form";

export const TeacherProfileEditor = () => {
    return (
        <div className="w-3/4 md:ml-5 ml-0 md:mb-20 mb-2">
            <PasswordUpdate />
            <br/>
            <hr/>
            <InformationForm />
        </div>
    )
}
