import React, { useState } from "react";
import { PlusCircle, RotateCw } from "lucide-react";
import axios from "axios";
import { router, usePage } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { User } from "@/types/app";
import { DataEmpty } from "@/Components/data-empty";
import { getFirstTwoLettersOfLastName } from "@/helper";
import useTeachersStore from "@/Context/useTeachersStore";
import { SharedInertiaData } from "@/types/inertia";
import Heading from "@/Components/Heading";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";

interface IProps {
    year: string;
    semester: string;
}

interface TeachersState {
    teachers: User[];
    fetchTeachers: () => Promise<User[]>;
}

export const CreateFormAssessment = ({ year, semester }: IProps) => {
    const { ziggy } = usePage<SharedInertiaData>().props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [teachersData, setTeachers] = useState<User[] | []>([]);

    const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
    const [selectedStep, setSelectedStep] = useState<
        "selectTeacher" | "selectDate"
    >("selectTeacher");
    const [dateForm, setDateForm] = useState({
        date_start: "",
        time_start: "",
        date_end: "",
        time_end: "",
    });

    // @ts-ignore
    const { teachers, fetchTeachers }: TeachersState = useTeachersStore();

    const selectTeacher = (teacher: User) => {
        if (teacher.id === selectedTeacher?.id) {
            setSelectedTeacher(null);
        } else {
            setSelectedTeacher(teacher);
            setSelectedStep("selectDate");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isSelected = selectedTeacher === null;

    const toggleModal = () => {
        setSelectedTeacher(null);
        setSelectedStep("selectTeacher");
        setIsModalOpen(!isModalOpen);
    };

    const openModal = async () => {
        toggleModal();
        setIsLoading(true);
        const data = await fetchTeachers();
        setTeachers(data);
        setIsLoading(false);
    };

    const handleSubmit = async () => {
        if (selectedTeacher === null) return;
        let isValid = true;

        if (!dateForm.date_start) {
            isValid = false;
        }

        if (!dateForm.time_start) {
            isValid = false;
        }

        if (!dateForm.date_end) {
            isValid = false;
        }

        if (!dateForm.time_end) {
            isValid = false;
        }

        if (!isValid) {
            toast.error("Silahkan lengkapi semua input");
            return;
        }

        const finalData = {
            teacher_id: selectedTeacher.id,
            year,
            semester,
            dateForm,
        };

        setIsLoadingPost(true);

        await axios
            .post("/visitation/teacher/attach", finalData)
            .then((data) => {
                toggleModal();
                router.reload();
            })
            .catch((err) => {
                console.info(err);
            })
            .finally(() => {
                setIsLoadingPost(false);
            });
    };

    return (
        <div>
            <Button onClick={openModal} size={"lg"}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Buat jadwal
            </Button>

            <Modal
                onClose={toggleModal}
                show={isModalOpen}
                closeable={!isLoading || isLoadingPost}
                maxWidth="lg"
            >
                <div className="px-6 py-4 max-h-[600px] w-full min-h-[600px] font-albert">
                    <div className="w-full">
                        <h2 className="text-md text-center font-bold">
                            Buat supervisi baru
                        </h2>
                    </div>

                    {selectedStep === "selectTeacher" && (
                        <div className="w-full flex flex-col mt-4 h-[450px] overflow-y-auto">
                            <Heading
                                title={"Guru"}
                                description="Silahkan pilih guru"
                            />
                            {isLoading && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {!isLoading && teachers.length > 0 && (
                                <ul className="w-full mt-3 flex flex-col space-y-1">
                                    {teachers.map((teacher) => (
                                        <li
                                            key={teacher.id}
                                            onClick={() =>
                                                selectTeacher(teacher)
                                            }
                                            className={`flex flex-row items-center gap-x-3 rounded-lg p-2 hover:cursor-pointer  transition ${
                                                selectedTeacher?.id ===
                                                    teacher.id && "bg-sky-100"
                                            }`}
                                        >
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage
                                                    src={
                                                        ziggy?.url +
                                                        "/storage/" +
                                                        teacher?.profile_picture
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {getFirstTwoLettersOfLastName(
                                                        teacher.name
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-sm">
                                                    {teacher.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {teacher.email}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {!isLoading && teachers.length < 1 && <DataEmpty />}
                        </div>
                    )}

                    {selectedStep === "selectDate" && (
                        <div>
                            <Heading
                                title="Tanggal"
                                description="Silahkan pilih tanggal pelaksanaan supervisi"
                            />
                            <div className="flex flex-col gap-y-4">
                                <div className="mt-6 flex sm:flex-row xs:flex-col gap-x-3">
                                    <div className="w-1/2">
                                        <Label htmlFor="date_start">
                                            Tanggal mulai
                                        </Label>
                                        <Input
                                            type="date"
                                            id="date_start"
                                            name="date_start"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Label htmlFor="time_start">
                                            Waktu mulai
                                        </Label>
                                        <Input
                                            type="time"
                                            id="time_start"
                                            name="time_start"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex sm:flex-row xs:flex-col gap-x-3">
                                    <div className="w-1/2">
                                        <Label htmlFor="date_end">
                                            Tanggal berakhir
                                        </Label>
                                        <Input
                                            type="date"
                                            id="date_end"
                                            onChange={handleChange}
                                            name="date_end"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Label htmlFor="time_end">
                                            Waktu berakhir
                                        </Label>
                                        <Input
                                            type="time"
                                            id="time_end"
                                            name="time_end"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-x-3 border-t bg-white">
                        <Button
                            onClick={handleSubmit}
                            className="w-full"
                            size={"lg"}
                            disabled={isSelected || isLoadingPost || isLoading}
                        >
                            {isLoadingPost && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Konfirmasi
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
