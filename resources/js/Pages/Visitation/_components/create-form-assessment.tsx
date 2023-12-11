import React, {useState} from "react";
import {PlusCircle, RotateCw} from "lucide-react";
import axios from "axios";
import {router} from "@inertiajs/react";

import {Button} from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {User} from "@/types/app";
import {DataEmpty} from "@/Components/data-empty";
import {getFirstTwoLettersOfLastName} from "@/helper";
import useTeachersStore from "@/Context/useTeachersStore";

interface IProps {
    year:string;
    semester: string;
}

interface TeachersState {
    teachers: User[];
    fetchTeachers: () => Promise<User[]>;
}

export const CreateFormAssessment = ({year, semester}: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [teachersData, setTeachers] = useState<User[] | []>([]);

    const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);

    // @ts-ignore
    const { teachers, fetchTeachers }: TeachersState = useTeachersStore();

    const selectTeacher = (teacher: User) => {
        if(teacher.id === selectedTeacher?.id) {
            setSelectedTeacher(null);
        }else {
            setSelectedTeacher(teacher);
        }
    }

    const isSelected = selectedTeacher === null;

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
        setSelectedTeacher(null)
    }

    const openModal = async () => {
        toggleModal()
        setIsLoading(true)
        const data = await fetchTeachers();
        setTeachers(data);
        setIsLoading(false)
    }

    const handleSubmit = async () => {
        if(selectedTeacher === null) return;

        const finalData = {
            teacher_id : selectedTeacher.id,
            year,
            semester
        }
        setIsLoadingPost(true)

        await axios.post("/visitation/teacher/attach", finalData)
            .then((data) => {
                toggleModal();
                router.reload();
            }).catch(err => {
                console.info(err)
            }) .finally(() => {
                setIsLoadingPost(false)
            })
    }


    return (
        <div>
            <Button onClick={openModal} size={"lg"}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Buat baru
            </Button>

            <Modal
                onClose={toggleModal}
                show={isModalOpen}
                closeable={!isLoading || isLoadingPost}
                maxWidth="lg"
            >
                <div className="px-6 py-4 max-h-[600px] w-full min-h-[600px]">
                    <div className="w-full">
                        <h2 className="text-md text-center font-bold">
                            Buat supervisi baru
                        </h2>
                    </div>

                    <div className="w-full flex mt-4 h-[450px] overflow-y-auto">
                        {isLoading && (
                            <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                        )}

                        {
                            !isLoading && teachers.length > 0 && (
                                <ul className="w-full mt-3 flex flex-col space-y-1">
                                    {teachers.map((teacher) => (
                                        <li
                                            key={teacher.id}
                                            onClick={() => selectTeacher(teacher)}
                                            className={`flex flex-row items-center gap-x-3 rounded-lg p-2 hover:cursor-pointer  transition ${selectedTeacher?.id === teacher.id && 'bg-sky-100'}`}

                                        >
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage />
                                                <AvatarFallback>
                                                    {
                                                        getFirstTwoLettersOfLastName(teacher.name)
                                                    }
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-sm">{teacher.name}</h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {teacher.email}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }

                        {
                            !isLoading && teachers.length < 1 && (
                                <DataEmpty />
                            )
                        }

                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-x-3 border-t bg-white">
                        <Button onClick={toggleModal} className="w-full" size={"lg"} variant="outline">
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="w-full" size={"lg"}
                            disabled={isSelected || isLoadingPost || isLoading}
                        >
                            {isLoadingPost && (
                                <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Konfirmasi
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
