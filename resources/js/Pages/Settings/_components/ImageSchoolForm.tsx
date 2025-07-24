import { ImageOffIcon, InfoIcon, Pencil, PlusCircle } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FormUpload } from "@/Components/FormUpload";
import { toast } from "sonner";
import axios from "axios";
import { router, usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/types/inertia";
import { FormError } from "@/Components/FormError";

export const ImageSchoolForm = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    const school = auth?.school;

    if (!school) return;

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined | string>(undefined);
    const [image, setImage] = useState<File | undefined>(undefined);

    const toggleEditing = () => setIsEditing(!isEditing);

    const handleChange = (file: File | undefined) => {
        setImage(file);
    };

    const onUpload = () => {
        if (!image) return;

        setIsLoading(true);
        setError(undefined);

        const formData = new FormData();
        formData.append("image", image);

        toast.promise(
            axios.post(route("setting.general.cover", school.id), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            {
                loading: "Loading...",
                success: () => {
                    setIsLoading(false);
                    toggleEditing();
                    router.reload();
                    return "Data berhasil di update";
                },
                error: (err) => {
                    const { message } = err.response.data;
                    setIsLoading(false);
                    setError(message as string);
                    return `Gagal mengupload`;
                },
            }
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    Foto sekolah
                    <DescUpload />
                </div>
                <Button variant={"ghost"} onClick={toggleEditing}>
                    {isEditing && <>Batal </>}

                    {!isEditing && !school.school_image && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" /> Upload
                            Gambar
                        </>
                    )}

                    {!isEditing && school.school_image && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" /> Ubah Gambar
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <div className="flex flex-col gap-y-2">
                    <FormUpload onFileChange={handleChange} />
                    <FormError message={error} />
                    <Button
                        className="mt-4 w-max"
                        onClick={onUpload}
                        disabled={isLoading || !image}
                    >
                        Unggah gambar
                    </Button>
                </div>
            ) : !school.school_image ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md overflow-hidden mt-2">
                    <ImageOffIcon className="text-slate-600" />
                </div>
            ) : (
                <div className="h-60 w-full relative overflow-hidden rounded-md mt-2">
                    <img
                        src={`/storage/${school.school_image}`}
                        alt="cover"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto object-cover"
                    />
                </div>
            )}
        </div>
    );
};

const DescUpload = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <InfoIcon className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent>
                <h2>Keterangan :</h2>
                <ul className="text-sm mt-2 text-muted-foreground list-decimal pl-6">
                    <li>
                        Ukuran gambar harus <b>: 900x400</b> piksel
                    </li>
                    <li>Format file yang diterima: Webp, PNG, atau JPG</li>
                    <li>
                        Format <b>Webp</b> sangat direkomendasikan untuk
                        performa optimal dan memiliki kualitas yang baik untuk
                        website
                    </li>
                    <li>
                        Ukuran file maksimal: <b>2 MB</b>
                    </li>
                    <li>Pastikan gambar memiliki resolusi tinggi dan jernih</li>
                </ul>
            </PopoverContent>
        </Popover>
    );
};
