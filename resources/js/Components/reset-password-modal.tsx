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

interface IProps {
    onClose: () => void;
    userId: string;
}


const ResetPasswordModal = ({onClose, userId}: IProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const finalData = { ...values, id: userId };

        await axios
            .post("/invitations/reset-password", finalData)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                router.visit("/teacher/dashboard")
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
            <Modal
                onClose={onClose}
                show={true}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Reset password
                        </h2>
                    </div>
                    <div className="mt-4">
                        <Alert className="my-4 bg-orange-100 border border-orange-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Perhatian!</AlertTitle>
                            <AlertDescription className="text-gray-600 text-xs mt-1">
                                Demi keamanan akun anda, diharuskan untuk mereset password untuk login yang pertama kali, silahkan gunakan email dan password untuk login.
                            </AlertDescription>
                        </Alert>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >

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
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                        size="lg"
                                    >
                                        {isLoading && (
                                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Konfirmasi
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

export default ResetPasswordModal;
