import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
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

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {AlertCircle, PlusCircle, RotateCw} from "lucide-react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Nama harus di isi",
        }),
        email: z
            .string()
            .min(2, {
                message: "Email harus di isi",
            })
            .email({
                message: "hmm, kelihatan email anda tidak benar",
            }),
        password: z.string().min(4, {
            message: "Password minimal 4 karakter",
        }),
        confirm_password: z.string().min(4, {
            message: "konfirmasi password baru wajib di isi!",
        }),

    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password baru dan konfirmasi password harus sama!",
        path: ["confirm_password"],
    });



const CreateModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
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
            .post("/teacher", values)
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
            <Button onClick={toggleModalAdd}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Tambah</Button>
            <Modal
                onClose={toggleModalAdd}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Tambah guru
                        </h2>
                    </div>
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan nama..."
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan email..."
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs text-gray-500">
                                                Email akan menjadi username
                                                untuk login
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan password..."
                                                    type="password"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Konfirmasi password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Konfirmasi password..."
                                                    {...field}
                                                    type="password"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
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
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading && (
                                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
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
    );
};

export default CreateModal;
