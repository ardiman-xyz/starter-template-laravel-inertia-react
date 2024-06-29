import {ImageOffIcon} from "lucide-react";
import {Label} from "@/Components/ui/label";

export const ImageSchoolForm = () => {
    return (
        <div>
            <Label>
                Foto Profil Sekolah
            </Label>
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md overflow-hidden mt-2">
                <ImageOffIcon className="text-slate-600"/>
            </div>
        </div>
    )
}
