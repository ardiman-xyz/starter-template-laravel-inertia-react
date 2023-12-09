import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {router} from "@inertiajs/react";

import { AlertCircle, RotateCw } from "lucide-react";

import {Button} from "@/Components/ui/button";
import Modal from "@/Components/Modal";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {Textarea} from "@/Components/ui/textarea";
import {Checkbox} from "@/Components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "@/Components/ui/radio-group";

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Nama harus di isi",
        }),
        response_type: z.string().min(2, {
            message: "Tipe jawab harus di isi",
        }),
        description: z.string().min(2, {
            message: "Deskripsi harus di isi",
        }),

        allowed_extensions: z.array(z.string()),
        max_size: z.string().optional(),
        is_multiple: z.enum(["yes", "no"], {
            required_error: "You need to select a status type.",
        }).optional(),
    }).refine(data => {

        if (data.response_type === 'upload') {
            return data.max_size !== "" && data.is_multiple !== undefined;
        }

        return true;

    }, {
        message: 'Harus diisi jika tipe upload'
    })

    const items = [
        {
            id: "pdf",
            label: "PDF",
        },
        {
            id: "image",
            label: "image",
        },
        {
            id: "docx",
            label: "docx",
        },
        {
            id: "xlsx",
            label: "xlsx",
        },
    ] as const;

interface IProps {
    stage: {
        id: number;
        name: string;
    }
}


const StageCreateModal = ({stage}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            response_type: "",
            description: "",
            max_size: "",
            allowed_extensions: [],

        },
    });

    const {watch} = form;

    const responseType = watch("response_type");

    const toggleModalAdd = () => {
        setIsOpenModalAdd(!isOpenModalAdd);
        form.reset();
        setError(null);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .post(`/instrumental/${stage.id}/instrument`, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                toggleModalAdd();
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
            <Button onClick={toggleModalAdd}>Tambah</Button>

            <Modal
                onClose={toggleModalAdd}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="xl"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Tambah instrumen
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan nama..."
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
                                name="response_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipe jawab</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jawab" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="upload">Upload</SelectItem>
                                                <SelectItem value="link">Link</SelectItem>
                                                <SelectItem value="streaming">Streaming</SelectItem>
                                                <SelectItem value="report">Wawancara offline</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs text-muted-foreground">
                                            Pilih jenis jawab untuk instrumen ini
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan deskripsi petunjuk step ini"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {
                                responseType === "upload" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="max_size"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Besar ukuran file</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="MB..."
                                                            {...field}
                                                            disabled={isLoading}
                                                            type="number"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormDescription className="text-xs text-muted-foreground">
                                                        contoh 1 MB
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="allowed_extensions"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4 mt-7">
                                                        <FormLabel>Validasi</FormLabel>
                                                        <FormDescription>
                                                            Silahkan pilih validasi untuk dokumen
                                                        </FormDescription>
                                                    </div>

                                                    <div className="flex items-center gap-x-4  border p-3 bg-gray-100">
                                                        {items.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="allowed_extensions"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-center  space-x-2 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([
                                                                                                ...field.value,
                                                                                                item.id,
                                                                                            ])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            );
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="is_multiple"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Upload per instrumen</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="yes" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Iya
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="no" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                   Tidak
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }



                            <div className="w-full flex items-center gap-x-3">
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant="outline"
                                    onClick={toggleModalAdd}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full"
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
            </Modal>

        </div>
    )
}

export default StageCreateModal;
