import {Head, router} from "@inertiajs/react";
import {useMemo, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "sonner";

import Social from "@/Layouts/SocialAuthLayout";
import {Input} from "@/Components/ui/input";
import FormBody from "@/Pages/School/_components/form-body";
import {Textarea} from "@/Components/ui/textarea";


enum STEPS {
    NAME = 0,
    LEADER = 1,
    ADDRESS = 2,
}

const CreateSchoolPage = () => {

    const [step, setStep] = useState(STEPS.NAME);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            leader_name: "",
            address: "",
        },
    });

    const name = watch("name");
    const leader_name = watch("leader_name");
    const address = watch("address");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.ADDRESS) {
            return onNext();
        }

        setIsLoading(true);

        await axios
            .post("/school", data)
            .then(({ data }) => {
                toast.success("Data berhasil di simpan");
                router.visit("/dashboard")
            })
            .catch((err) => {
                console.info(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.ADDRESS) {
            return "Simpan";
        }

        return "Selanjutnya";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.NAME) {
            return undefined;
        }

        return "Kembali";
    }, [step]);

    let bodyContent = (
        <div>
            <h1 className="text-center font-bold text-3xl">Nama Sekolah Anda ?</h1>
            <p className="text-sm text-gray-400 mt-5 text-center">
                Masukkan nama sekolah anda.
            </p>

            <div className="mt-6 w-full flex justify-center flex-col items-center">
                <Input
                    {...register("name", { required: true })}
                    value={name}
                    onChange={(e) => setCustomValue("name", e.target.value)}
                    placeholder="Nama sekolah"
                    className="w-[400px]"
                />
            </div>
        </div>
    );

    if (step === STEPS.LEADER) {
        bodyContent = (
            <div>
                <h1 className="text-center font-bold text-3xl">
                    Nama kepala sekolah anda ?
                </h1>
                <p className="text-sm text-gray-400 mt-5 text-center">
                    Masukkan nama kepala sekolah.
                </p>

                <div className="mt-6 w-full flex justify-center flex-col items-center">
                    <Input
                        {...register("leader_name", { required: true })}
                        value={leader_name}
                        onChange={(e) => setCustomValue("leader_name", e.target.value)}
                        placeholder="Nama kepala sekolah"
                        className="w-[400px]"
                    />
                </div>
            </div>
        );
    }

    if (step === STEPS.ADDRESS) {
        bodyContent = (
            <div>
                <h1 className="text-center font-bold text-3xl">
                    Alamat sekolah anda ?
                </h1>
                <p className="text-sm text-gray-400 mt-5 text-center">
                    Masukkan alamat sekolah anda.
                </p>

                <div className="mt-6 w-full flex justify-center flex-col items-center">
                    <Textarea
                        {...register("address", { required: true })}
                        value={address}
                        onChange={(e) => setCustomValue("address", e.target.value)}
                        placeholder="Alamat sekolah anda"
                        className="w-[400px]"
                    />
                </div>
            </div>
        );
    }

    return (
        <Social>
            <Head title="Buat baru informasi sekolah " />
            <FormBody
                body={bodyContent}
                disabled={isLoading}
                actionLabel={actionLabel}
                onSubmit={handleSubmit(onSubmit)}
                secondaryAction={step === STEPS.NAME ? undefined : onBack}
                secondaryActionLabel={secondaryActionLabel}
                step={step}
            />
        </Social>
    )
}

export default CreateSchoolPage;
