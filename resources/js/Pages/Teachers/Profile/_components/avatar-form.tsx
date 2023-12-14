import {ChangeEvent, useRef, useState} from 'react';
import {RotateCw, User} from "lucide-react";
import {toast} from "sonner";
import axios from "axios";
import {router, usePage} from "@inertiajs/react";
import {SharedInertiaData} from "@/types/inertia";

import {isValidImage, isValidSize} from "@/helper";
import {Button} from "@/Components/ui/button";

export const AvatarForm = () => {

    const {auth, ziggy, app} = usePage<SharedInertiaData>().props;

    const fileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
        fileRef.current?.click();
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(!files || files.length === 0) {
            return;
        }

        const uploadedFile = files[0];

        if(!isValidImage(uploadedFile)) {
            toast.error("Ekstensi gambar tidak valid")
            return;
        }

        if(!isValidSize(uploadedFile)) {
            toast.error("Tidak boleh lebih dari 1 MB")
            return;
        }

        setIsLoading(true)

        await axios.post("/teachers/profile/avatar", {
            avatar: uploadedFile
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((data) => {
                toast.success("Avatar berhasil di update")
                router.reload()
            }).catch(err => {
                console.info(err)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="w-1/4 flex items-center justify-start flex-col">
            <div className="w-[140px] h-[140px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {
                    auth?.user?.profile_picture === null ? (
                        <User className="h-[100px] w-[100px] stroke-gray-400"/>
                    ):(
                        <div>
                            <img src={ziggy?.url+"/storage/"+auth?.user?.profile_picture} alt="profile"/>
                        </div>
                    )
                }
            </div>
            <input ref={fileRef} type="file" onChange={handleChange} className="hidden" accept="image/*"/>
            <Button disabled={isLoading} onClick={handleClick} variant="outline" className="mt-5 text-xs">
                {isLoading && (
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upload foto
            </Button>
        </div>
    )
}

