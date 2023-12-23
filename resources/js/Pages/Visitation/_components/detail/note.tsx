import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {ChevronDown, RotateCw} from "lucide-react";

import Heading from "@/Components/Heading";
import {Hint} from "@/Components/Hint";
import {Textarea} from "@/Components/ui/textarea";
import {cn} from "@/lib/utils";
import {Button} from "@/Components/ui/button";
import {router} from "@inertiajs/react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import useVisitationContextNew from "@/Context/useVisitationContextNew";

const formSchema = z
    .object({
        finder: z
            .string()
            .min(1, {
                message: "Temuan harus di isi",
            }),
        action_plan: z.string().min(1, {
            message: "Tindak lanjut haru di isi",
        }),
    });

interface NoteProps {
    defaultData : {
        action_plan?: string | null;
        findings?: string | null;
    }
}

export const Note = ({defaultData}: NoteProps) => {

    const { assessmentId } = useVisitationContextNew();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            finder: defaultData.findings ?? "",
            action_plan: defaultData.action_plan ?? "",
        },
    });

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await axios
            .put(`/visitation/${assessmentId}/analysis`, values)
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
        <div>
            <div className="flex justify-between bg-gray-100 rounded p-4">
                <Heading
                    title={`Temuan dan Tindak Lanjut Guru`}
                    description={`Silakan gunakan formulir di bawah ini untuk mencatat temuan Anda dan tindak lanjut yang guru akan lakukan dan perbaiki.`}
                />
                <Hint description={isOpen ? "Close section" : "Open section"}>
                    <ChevronDown onClick={handleClick} className={`transition-transform duration-500 ${isOpen ? "" : "transform -rotate-90"}`}/>
                </Hint>
            </div>

            <div className={cn("mt-3", !isOpen && "hidden")}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <FormField
                            control={form.control}
                            name="finder"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Temuan <span className="text-xs text-red-700">*</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukan temuan di sini..."
                                            {...field}
                                            disabled={isLoading}
                                            className="min-h-[200px]"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="action_plan"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tindak Lanjut <span className="text-xs text-red-700">*</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukan tindak lanjut di sini..."
                                            {...field}
                                            disabled={isLoading}
                                            className="min-h-[200px]"
                                        />
                                    </FormControl>
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
        </div>
    )
}
