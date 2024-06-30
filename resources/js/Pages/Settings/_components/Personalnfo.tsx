import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {PersonalInfoSchema} from "@/Schemas";

import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import {useState} from "react";
import {toast} from "sonner";
import axios from "axios";
import {router, usePage} from "@inertiajs/react";
import {SharedInertiaData} from "@/types/inertia";
import {FormError} from "@/Components/FormError";
import Heading from "@/Components/Heading";

export const Personalnfo = () => {

    const {auth} = usePage<SharedInertiaData>().props;
    const user = auth?.user
    if(!user)return;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined|string>(undefined)

    const form = useForm<z.infer<typeof PersonalInfoSchema>>({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: {
            email: user.email,
        },
    });

    const onSubmit = (values: z.infer<typeof PersonalInfoSchema>) => {
        setError(undefined)
        setIsLoading(true)
        toast.promise(
            axios.put(route("user.email.update", user.id), values),
            {
                loading: "Loading...",
                success: () => {
                    setIsLoading(false);
                    router.get("/logout");
                    return "Data berhasil di update";
                },
                error: (err) => {
                    const { message } = err.response.data;
                    setIsLoading(false);
                    setError(message)
                    return "Gagal menyimpan";
                },
            }
        );
    }

    return (
        <>
            <Heading
                title="Email Akun"
                description="Perbarui email Anda untuk menjaga akun tetap akurat"
                className="mb-7"
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Email dijadikan sebagai username untuk authentikasi, Pastikan email anda aktif
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="mt-2">
                        <FormError message={error} />
                    </div>
                    <Button type="submit" disabled={isLoading}>Simpan Email</Button>
                </form>
            </Form>
        </>
    )
}
