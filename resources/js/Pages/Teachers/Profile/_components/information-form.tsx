import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {router, usePage} from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import {AlertCircle, RotateCw} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import Heading from "@/Components/Heading";
import {Textarea} from "@/Components/ui/textarea";
import {SharedInertiaData} from "@/types/inertia";


const formSchema = z
    .object({
        name: z
            .string()
            .min(2, {
                message: "Nama wajib di isi!",
            }),
        email: z
            .string()
            .min(2, {
                message: "Email wajib di isi",
            }).email({
                message: "Email tidak valid"
            }),
        gender: z.string().min(1, {
            message: "Jenis kelamin wajib di isi!"
        }),
        address: z.string().optional(),
        nip: z.string().optional(),
        phone: z.string().optional(),
    })

export const InformationForm = () => {

    const {auth, ziggy} = usePage<SharedInertiaData>().props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: auth?.user?.name,
            email: auth?.user?.email,
            gender: auth?.user?.gender ?? "",
            address: auth?.user?.address ?? "",
            nip: auth?.user?.nip ?? "",
            phone: auth?.user?.phone_number ?? ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .put("/teachers/profile/account", values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
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
        <div className="mt-10">

            <Heading title="Personal" description="Lengkapi data diri anda" />

            <br/>
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
                                <FormLabel>Nama <span className="text-xs text-red-700">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Masukkan nama anda..."
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
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email <span className="text-xs text-red-700">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Masukkan email anda..."
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
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Jenis Kelamin <span className="text-xs text-red-700">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Laki-laki</SelectItem>
                                        <SelectItem value="female">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>No. HP/WA</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Masukkan no hp/wa anda..."
                                        {...field}
                                        disabled={isLoading}
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nip"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>NIP</FormLabel>
                                <Input
                                    placeholder="nip..."
                                    {...field}
                                    disabled={isLoading}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Alamat</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Masukkan alamat.."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-sm text-muted-foreground">
                                    Sesuai dengan alamat di KTP anda
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex items-center gap-x-3">
                        <Button
                            type="submit"
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
    )
}
