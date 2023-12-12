import React, {useState} from "react";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {router} from "@inertiajs/react";
import {RotateCw} from "lucide-react";

import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import useVisitationContext from "@/Context/useVisitationContext";


interface IProps {
    onClose : () => void;
    name: string;
    id: number;
}


const formSchema = z
    .object({
        date_start: z.string().min(1, {
            message: "Input harus di isi",
        }),
        time_start: z.string().min(1, {
            message: "Input harus di isi",
        }),
        date_end: z.string().min(1, {
            message: "Input harus di isi",
        }),
        time_end: z.string().min(1, {
            message: "Input harus di isi",
        }),
    })

export const SettingDateModal = ({onClose, name, id}: IProps) => {

    const { assessmentId, stageName } = useVisitationContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date_start: "",
            time_start: "",
            date_end: "",
            time_end: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const finalData = {...values, stageName }
        setIsLoading(true);
        await axios
            .post(`/visitation/${assessmentId}/date/${id}`, finalData)
            .then((data) => {
                console.info(data)
                const { message } = data.data;
                toast.success(`${message}`);
                form.reset();
                router.reload();
                onClose()
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
        <Modal
            onClose={onClose}
            show={true}
            closeable={!isLoading}
            maxWidth="xl"
        >
            <div className="px-6 py-4">
                <div className="w-full mb-10">
                    <h2 className="text-md text-center font-bold capitalize">
                        Pengaturan tanggal {name} {stageName}
                    </h2>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 m-4"
                    >
                        <div className="">
                            <div className="flex gap-x-3 mb-4">
                                <FormField
                                    control={form.control}
                                    name="date_start"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Tanggal mulai</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    type="date"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time_start"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Waktu mulai</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    type="time"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-x-3 mb-7">
                                <FormField
                                    control={form.control}
                                    name="date_end"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Tanggal berakhir</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    type="date"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time_end"
                                    render={({field}) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Waktu berakhir</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    type="time"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="w-full flex items-center gap-x-3 mt-6">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
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
        </Modal>
    )
}
