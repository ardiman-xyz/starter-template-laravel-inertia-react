import { useState } from "react";
import axios from "axios";
import { AlertCircle, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import {Button} from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {router} from "@inertiajs/react";

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Nama harus di isi",
        }),
        response_type: z.string().min(2, {
            message: "Tipe jawab harus di isi",
        }),
    })


interface IProps {
    stage: {
        id: number;
        name: string;
    }
}


const StageCreateModal = ({stage}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            response_type: "",
        },
    });

    const toggleModalAdd = () => {
        setIsOpenModalAdd(!isOpenModalAdd);
        form.reset();
        setError(null);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .post(`/instrumental/${stage.id}/instrument`, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                toggleModalAdd();
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
            <Button onClick={toggleModalAdd}>Tambah</Button>

            <Modal
                onClose={toggleModalAdd}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Tambah instrumen
                        </h2>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan nama..."
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
                                name="response_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipe jawab</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jawab" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="upload">Upload</SelectItem>
                                                <SelectItem value="link">Link</SelectItem>
                                                <SelectItem value="streaming">Streaming</SelectItem>
                                                <SelectItem value="report">Wawancara offline</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs text-muted-foreground">
                                            Pilih jenis jawab untuk instrumen ini
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="w-full flex items-center gap-x-3">
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant="outline"
                                    onClick={toggleModalAdd}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
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

        </div>
    )
}

export default StageCreateModal;
