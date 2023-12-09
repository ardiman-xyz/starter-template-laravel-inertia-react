import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {router} from "@inertiajs/react";

import Modal from "@/Components/Modal";
import {Button} from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {RotateCw} from "lucide-react";
import {Textarea} from "@/Components/ui/textarea";

interface IProps {
    onClose : () => void;
    instrumentId : number;
    getData : () => void;
}

const formSchema = z
    .object({
        title: z.string().min(1, {
            message: "Judul harus di isi",
        }),
        max_score: z.string().min(1, {
            message: "Maksimal skor harus di isi",
        }),
    })

const CreateInstrumentItemModal = ({onClose, instrumentId, getData}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            max_score: "",
        },
    });

    const toggleModal = () => {
        onClose();
        form.reset()
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .post(`/instrumental/${instrumentId}/instrument/criteria`, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                toggleModal();
                form.reset();
                router.reload();
                getData()
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
            maxWidth="lg"
        >
            <div className="px-6 py-4">
                <div className="w-full flex items-center justify-center">
                    <h2 className="text-md text-center font-bold">
                        Tambah instrumen item
                    </h2>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Judul</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukkan judul..."
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_score"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Skor maksimal</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Masukkan skor maksimal..."
                                            {...field}
                                            disabled={isLoading}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <br/>
                        <div className="w-full flex items-center gap-x-3 mt-4">
                            <Button
                                type="button"
                                className="w-full"
                                variant="outline"
                                onClick={toggleModal}
                                disabled={isLoading}
                            >
                                Batal
                            </Button>
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

export default CreateInstrumentItemModal
