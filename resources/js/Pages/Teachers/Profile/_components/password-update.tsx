import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import {AlertCircle, RotateCw} from "lucide-react";

import Heading from "@/Components/Heading";

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
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";

const formSchema = z
    .object({
        current_password: z
            .string()
            .min(2, {
                message: "Password sekarang",
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

export const PasswordUpdate = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .put("/teachers/profile/account/password", values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
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
            <Heading title="Akun" description="Mangage akun dan password anda" />
            {error !== null && (
                <Alert className="mb-5 bg-red-100 border border-red-600">
                    <AlertCircle className="h-4 w-4 " />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <br/>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <FormField
                        control={form.control}
                        name="current_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password saat ini <span className="text-xs text-red-700">*</span></FormLabel>
                                <FormControl>
                                <Input
                                        placeholder="Masukkan password saat ini..."
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password <span className="text-xs text-red-700">*</span></FormLabel>
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
                                    Konfirmasi password <span className="text-xs text-red-700">*</span>
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
    )
}
