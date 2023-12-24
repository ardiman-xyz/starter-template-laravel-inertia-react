import {AlertCircle, RotateCw, Upload} from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import * as z from "zod";

import { Button } from "@/Components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import Modal from "@/Components/Modal";
import {Textarea} from "@/Components/ui/textarea";
import useAssessmentStore from "@/Context/teacher/useAssessmentStore";

const formSchema = z
    .object({
        link: z.string().url({
            message: "Harap masukkan URL yang valid",
        }).min(2, {
            message: "Link harus di isi",
        }),
    })

interface IProps {
    defaultData: {
        link?: string | null
    };
    alreadyAnswer: boolean;
}


export const AnswerStoreModal = ({defaultData, alreadyAnswer}: IProps) => {

    const { assessmentId } = useAssessmentStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    });

    const toggleModalAnswer = () => {
        setIsOpenModalAdd(!isOpenModalAdd);
        form.reset();
        setError(null);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true);
        await axios
            .post(`/teachers/visitation/${assessmentId}/answer`, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                toggleModalAnswer();
                form.reset();
                router.reload();
            })
            .catch((err) => {
                const { data, status, statusText } = err.response;
                toast.error(`${statusText} ${status}`, {
                    description: `${data.message}`,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    return (
        <div>
            <Button onClick={toggleModalAnswer} className="bg-sky-800 hover:bg-sky-700 ">
                <Upload className="w-4 h-4 mr-2"/>
                {
                    alreadyAnswer ? "Ubah jawaban" : "Kirim jawaban"
                }
            </Button>

            <Modal
                onClose={toggleModalAnswer}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Upload jawaban
                        </h2>
                    </div>

                    <Alert className="mt-4 bg-yellow-100 border border-yellow-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Penting!</AlertTitle>
                        <AlertDescription>
                            Silahkan masukkan link video, link dari youtube, google drive, dan link lain yang dapat diakses.
                        </AlertDescription>
                    </Alert>

                    <div className="mt-4">
                        {error !== null && (
                            <Alert className="mb-5 bg-red-100 border border-red-600">
                                <AlertCircle className="h-4 w-4 " />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="link"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Link video</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Masukkan link video..."
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <br/>
                                <div className="w-full flex items-center gap-x-3">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                        size="lg"
                                    >
                                        {isLoading && (
                                            <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                                        )}
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
