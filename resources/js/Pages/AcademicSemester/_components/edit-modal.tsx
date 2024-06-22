import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {AlertCircle, RotateCw} from "lucide-react";
import {AcademicSemesterSchema} from "@/Schemas";
import {AcademicSemester} from "@/types/app";

interface EditModalProps {
    data: AcademicSemester
    isOpen: boolean;
    onClose: (isCancelled: boolean) => void;
}

export const EditModal = ({data, isOpen, onClose}: EditModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof AcademicSemesterSchema>>({
        resolver: zodResolver(AcademicSemesterSchema),
        defaultValues: {
            year: data.year,
            academic_year: data.academic_year,
            semester: data.semester,
            start_date: data.start_date,
            end_date: data.end_date,
        },
    });



    async function onSubmit(values: z.infer<typeof AcademicSemesterSchema>) {

        setIsLoading(true);
        await axios
            .put(route("academic_year.update", data.id), values)
            .then((data) => {
                const { message } = data.data;
                onClose(false)
                toast.success(`${message}`);
            })
            .catch((err) => {
                const { data, status, statusText } = err.response;
                toast.error(`${statusText} ${status}`, {
                    description: `${data.message}`,
                });
                setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (

            <Modal
                onClose={onClose}
                show={isOpen}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Ubah tahun ajaran {data.academic_year} / {data.semester}
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
                                    name="academic_year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tahun Akademik</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ex: 2022/2024"
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
                                    name="semester"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Semester</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih semester" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="ganjil">Ganjil</SelectItem>
                                                    <SelectItem value="genap">Genap</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tahun</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2024"
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
                                    name="start_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Mulai</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="date"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="end_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Berakhir</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="date"
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
                                        onClick={() => onClose(true)}
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
    );
};

