
import {AlertCircle, RotateCw} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {router} from "@inertiajs/react";

import {useState} from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import axios from "axios";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";


const formSchema = z.object({
    name: z.string().optional(),
    email: z
        .string()
        .email({
            message: "Email tidak valid",
        })
        .min(2, {
            message: "Email is required",
        }),
    password: z.string().min(2, {
        message: "Password is required",
    }),
});


interface AuthForm {
    variant: string;
}

const AuthFomAction = ({variant}: AuthForm) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const url = variant === "Login" ? "": ""

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const url = variant === "Login" ? "/auth/login" : "/auth/register";

        setError(null)

        console.info(values);
        setIsLoading(true);
        await axios
            .post(url, values)
            .then((data) => {
                const { role } = data.data.data;

                if(role === "Teacher") {
                    router.visit("/teacher/dashboard")
                    return;
                }
                window.location.reload();

            })
            .catch((err) => {
                console.info(err)
                const { data, status, statusText } = err.response;
                setError(data.message)
                setIsLoading(false);
            });
    }

    return (
        <div className="mt-6 w-[313px]">

            {
                error !== null && (
                    <Alert className='bg-red-100 border border-red-200 flex items-center justify-center'>
                        <AlertDescription className="text-center text-xs font-semibold text-gray-600">
                            {error}
                        </AlertDescription>
                    </Alert>
                )
            }

            <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {variant === "Register" && (
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
                        )}
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
                                            placeholder="Masukkan masukkan password..."
                                            {...field}
                                            disabled={isLoading}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full mt-6">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && (
                                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {
                                    variant === "Login" ? "Login" : "Register"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="mt-6">
                <div className="relative">
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            "
                                >
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthFomAction;
