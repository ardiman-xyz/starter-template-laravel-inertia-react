
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {GeneralInfoSchema} from "@/Schemas";
import {z} from "zod";

import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {EDUCATION_LEVELS, SCHOOL_STATUSES} from "@/Constants/Index";
import {Textarea} from "@/Components/ui/textarea";
import {useState} from "react";
import {toast} from "sonner";
import axios from "axios";
import {router, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {SharedInertiaData} from "@/types/inertia";

export const GeneralInfoForm = () => {

    const {auth} = usePage<SharedInertiaData>().props;

    const school = auth?.school

    if(!school)return;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof GeneralInfoSchema>>({
        resolver: zodResolver(GeneralInfoSchema),
        defaultValues: {
            school_name: school.name,
            leader_name: school.leader_name,
            address: school.address,
            npsn: school.npsn || "",
            education_level: school.education_level || "",
            school_status: school.status || "",
            email: school.email || "",
        },
    });

    const onSubmit = (values: z.infer<typeof GeneralInfoSchema>) => {
        setIsLoading(true)
        toast.promise(
            axios.put(route("setting.general.update", school.id), values),
            {
                loading: "Loading...",
                success: () => {
                    setIsLoading(false);
                    router.reload();
                    return "Data berhasil di update";
                },
                error: (err) => {
                    const { message } = err.response.data;
                    setIsLoading(false);
                    return "Gagal menyimpan";
                },
            }
        );
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="school_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Sekolah</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="leader_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Kepala Sekolah</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                            <FormLabel>Email Sekolah</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="npsn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NPSN</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription >
                                Silahkan masukkan Nomor Pokok Sekolah Nasional jika ada
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="education_level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jenjang</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {EDUCATION_LEVELS.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="school_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange}  defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {SCHOOL_STATUSES.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br/>
                <Button type="submit" disabled={isLoading}>Simpan informasi</Button>
            </form>
        </Form>
    )
}
