import React, {useEffect, useState} from "react";
import {UserIcon} from "lucide-react";
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import {UserFormSchema} from "@/Schemas";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Textarea} from "@/Components/ui/textarea";

interface GeneralInfoProps {
    id: number;
}

export const GeneralInfo = ({id}: GeneralInfoProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = () => {
        console.info(id)
    }

    const form = useForm<z.infer<typeof UserFormSchema>>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof UserFormSchema>) {
        console.log(values)
    }

    return (
        <div className="flex flex-col gap-10 mb-10">
            <div>
                <p className="mb-3">Profile Picture</p>
                <div
                    className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <UserIcon className="stroke-gray-400 h-[80px] w-[80px]"/>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
