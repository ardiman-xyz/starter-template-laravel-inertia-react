import {Button} from "@/Components/ui/button";
import {AlertCircle, PlusCircle, RotateCw} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {toast} from "sonner";
import {router} from "@inertiajs/react";
import {Alert, AlertDescription, AlertTitle} from "@/Components/ui/alert";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import Modal from "@/Components/Modal";
import {Textarea} from "@/Components/ui/textarea";


const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Nama harus di isi",
        }),
        max_score: z.string().min(1, {
            message: "Skor harus di isi"
        })
    })

interface IProps {
    documentId: number;
}

export const CreateInstrumentItemModal = ({documentId}: IProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            max_score: ""
        },
    });

    const toggleModalAdd = () => {
        setIsOpenModalAdd(!isOpenModalAdd);
        form.reset();
        setError(null);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .post(`/instruments/${documentId}/item`, values)
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
            <Button onClick={toggleModalAdd}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Tambah
            </Button>
            <Modal
                onClose={toggleModalAdd}
                show={isOpenModalAdd}
                closeable={!isLoading}
                maxWidth="lg"
            >
                <div className="px-6 py-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Tambah Instrumen
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
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Judul <span className="text-red-800 text-xs">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Masukkan judul..."
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
                                    name="max_score"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Maksimal Skor <span
                                                className="text-red-800 text-xs">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan skor..."
                                                    {...field}
                                                    disabled={isLoading}
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <br/>
                                <div className="w-full flex items-center gap-x-3">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                        size="lg"
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
                </div>
            </Modal>
        </div>
    )
}
