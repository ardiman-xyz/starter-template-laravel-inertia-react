import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/Components/ui/form";

import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

interface EditModalProps {
    id: string;
    name: string;
    onClose: () => void;
}
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Role name must be at least 2 characters.",
    }),
});

const EditModal = ({ id, name, onClose }: EditModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        setIsLoading(true);
        await axios
            .put(`roles/${id}`, values)
            .then((data) => {
                const { message } = data.data;
                toast.success(`${message}`);
                form.reset();
                onClose();
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
            <Modal
                onClose={onClose}
                show={true}
                closeable={!isLoading}
                maxWidth="md"
            >
                <div className="p-4">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-md text-center font-bold">
                            Tambah Role
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
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan nama role..."
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Tambah
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditModal;
