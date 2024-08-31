import Social from "@/Layouts/SocialAuthLayout";
import { Head, Link } from "@inertiajs/react";
import { Rocket, ScanFace, Unlock, XCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import ResetPasswordModal from "@/Components/reset-password-modal";

interface IProps {
    user: {
        name: string;
        id: string;
        email: string;
    };
    school: {
        name: string;
    };
}
const Invitation = ({ user, school }: IProps) => {
    const [modalResetPasswordOpen, setModalResetPasswordOpen] =
        useState<boolean>(false);

    const toggleModalReset = () =>
        setModalResetPasswordOpen(!modalResetPasswordOpen);

    return (
        <Social>
            <Head title="Invite link" />
            <div className="flex items-center gap-x-2 bg-[#BBD5C1] px-3 py-1 rounded justify-center mb-5">
                <ScanFace className="h-4 w-4 text-green-900 stroke-green-700" />
                <p className="text-green-700 font-semibold text-sm">
                    Invitation
                </p>
            </div>
            <div>
                <h1 className="text-center font-bold text-3xl uppercase">
                    Halo, {user.name}
                </h1>
                <p className="text-sm text-gray-400 mt-3 text-center">
                    Email: {user.email}
                </p>
                <p className="mt-4 text-gray-700 text-md text-center">
                    Anda telah diundang oleh Sekolah{" "}
                    <span className="font-bold">{school.name}</span>.
                </p>
            </div>
            <Button className="mt-10 " size="lg" onClick={toggleModalReset}>
                <Rocket className="h-4 w-4 mr-2" />
                Gabung sekarang
            </Button>
            {modalResetPasswordOpen && (
                <ResetPasswordModal
                    onClose={toggleModalReset}
                    userId={user.id}
                />
            )}
        </Social>
    );
};

export default Invitation;
