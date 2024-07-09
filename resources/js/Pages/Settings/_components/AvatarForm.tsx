import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { router, usePage } from "@inertiajs/react";
import { User } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { SharedInertiaData } from "@/types/inertia";
import { FormError } from "@/Components/FormError";

export const AvatarForm = () => {
    const { auth } = usePage<SharedInertiaData>().props;

    const user = auth?.user;

    if (!user) return;

    const fileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined | string>(undefined);

    const handleClick = () => {
        fileRef.current?.click();
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const uploadedFile = files[0];

        setIsLoading(true);
        setError(undefined);

        toast.promise(
            axios.post(
                route("user.avatar.update", user.id),
                { avatar: uploadedFile },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ),
            {
                loading: "Loading...",
                success: () => {
                    setIsLoading(false);
                    router.reload();
                    return "Avatar berhasil di update";
                },
                error: (err) => {
                    const { message } = err.response.data;
                    setIsLoading(false);
                    setError(message);
                    return "Gagal menyimpan";
                },
            }
        );
    };

    return (
        <div className="flex flex-col">
            <div className="w-[140px] h-[140px] bg-white rounded-full flex items-center justify-center overflow-hidden border-2">
                {user.profile_picture === null ? (
                    <User className="h-[100px] w-[100px] stroke-gray-400" />
                ) : (
                    <div>
                        <img
                            src={"/storage/" + user.profile_picture}
                            alt="profile"
                        />
                    </div>
                )}
            </div>
            <input
                ref={fileRef}
                type="file"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
            />
            <div className="mt-2 w-max">
                <FormError message={error} />
            </div>
            <Button
                disabled={isLoading}
                onClick={handleClick}
                variant="outline"
                className="mt-3 text-xs w-max ml-5"
            >
                Upload foto
            </Button>
        </div>
    );
};
