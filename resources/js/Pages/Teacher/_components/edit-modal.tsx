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

import { toast } from "sonner";
import { router } from "@inertiajs/react";


import {User} from "@/types/app";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import {RotateCw} from "lucide-react";


interface EditModalProps {
    user: User,
    onClose : () => void;
}

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
        password: z.string().optional(),
        confirm_password: z.string().optional(),
    }) .refine((data) => data.password === data.confirm_password, {
        message: "Password baru dan konfirmasi password harus sama!",
        path: ["confirm_password"],
    });


const EditModal = ({user, onClose}: EditModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: "",
            confirm_password: "",
        },
    });

    const toggleModal = () => {
        onClose()
        form.reset();
        setError(null);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.info(values);
        setIsLoading(true);
        await axios
            .put("/teacher/"+user.id, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                toggleModal();
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
        <Modal
            onClose={onClose}
            show={true}
            closeable={!isLoading}
            maxWidth="lg"
        >
            <div className="px-6 py-4">
                <div className="w-full flex items-center justify-center">
                    <h2 className="text-md text-center font-bold">
                        {user.name}
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
                                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
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

export default EditModal;
