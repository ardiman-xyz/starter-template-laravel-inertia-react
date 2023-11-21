import { Link, Head } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Toaster, toast } from "sonner";

import { PageProps } from "@/types";
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
import axios from "axios";
import { useState } from "react";
import { RotateCw } from "lucide-react";

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username harus di isi",
    }),
    password: z.string().min(2, {
        message: "Password harus di isi",
    }),
});

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .post("/login", values)
            .then(({ data }) => {
                // console.info(data);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 500) {
                        toast.error("Server error. Please try again later.");
                    } else if (err.response.status === 422) {
                        toast.error(err.response.data.message);
                    }
                } else {
                    toast.error("Something went wrong");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <Head title="ODS" />
            <p>/</p>
            {/* <Toaster />
            <div className="container mx-auto max-w-6xl h-screen pt-10 flex rounded-xl overflow-hidden mt-10">
                <div className="h-[600px] lg:w-1/2 w-full bg-white p-8">
                    <div className="flex items-center gap-x-3">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="mt-5">
                        <p className="text-sm">Selamat datang di</p>
                        <h2 className="text-xl font-bold">One day service</h2>
                        <p className="text-sm">
                            FKIP - Universitas Muhammadiyah Kendari
                        </p>
                        <p className="text-sm mt-3 font-thin">
                            Silahkan masukkan username & password anda
                        </p>
                    </div>
                    <div className="mt-7">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="username"
                                                    disabled={isLoading}
                                                    {...field}
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
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="password"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex flex-col gap-y-3 mt-3">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={!isValid || isLoading}
                                        className="w-full"
                                    >
                                        {isLoading && (
                                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Submit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        type="button"
                                        className="w-full"
                                    >
                                        Kembali
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="h-[600px] lg:w-1/2 hidden lg:block bg-bittersweetShimmer">
                    <div className="w-full h-[600px] object-cover">
                        <img
                            src="/images/slider2.png"
                            alt="Gambar"
                            className="w-full h-[600px] object-center object-cover"
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            </div> */}
        </>
    );
}
