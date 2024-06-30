import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {AccountFormSchema} from "@/Schemas";

import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import {useState} from "react";
import {Checkbox} from "@/Components/ui/checkbox";
import {toast} from "sonner";
import axios from "axios";
import {router, usePage} from "@inertiajs/react";
import {SharedInertiaData} from "@/types/inertia";
import {FormError} from "@/Components/FormError";
import Heading from "@/Components/Heading";

export const AccountForm = () => {

    const {auth} = usePage<SharedInertiaData>().props;
    const school = auth?.school
    if(!school)return;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined|string>(undefined)

    const form = useForm<z.infer<typeof AccountFormSchema>>({
        resolver: zodResolver(AccountFormSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
    });


    const onSubmit = (values: z.infer<typeof AccountFormSchema>) => {
        setError(undefined)
        setIsLoading(true)
        toast.promise(
            axios.put(route("setting.password.update", school.id), values),
            {
                loading: "Loading...",
                success: () => {
                    setIsLoading(false);
                    router.get("/logout");
                    return "Data berhasil di update";
                },
                error: (err) => {
                    const { message } = err.response.data;
                    setIsLoading(false);
                    setError(message)
                    return "Gagal menyimpan";
                },
            }
        );
    }

    return (
       <>
           <Heading
               title="Keamanan Password"
               description="Perbarui password Anda secara berkala untuk melindungi akun"
               className="mb-7"
           />
           <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   <FormField
                       control={form.control}
                       name="old_password"
                       render={({field}) => (
                           <FormItem>
                               <FormLabel>Password Lama</FormLabel>
                               <FormControl>
                                   <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="*****"
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
                       name="new_password"
                       render={({field}) => (
                           <FormItem>
                               <FormLabel>Password Baru</FormLabel>
                               <FormControl>
                                   <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="*****"
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
                       name="confirm_password"
                       render={({field}) => (
                           <FormItem>
                               <FormLabel>Konfirmasi Password</FormLabel>
                               <FormControl>
                                   <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="*****"
                                       {...field}
                                       disabled={isLoading}
                                   />
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                       )}
                   />
                   <div className="flex items-center space-x-2">
                       <Checkbox
                           id="show-password"
                           checked={showPassword}
                           onCheckedChange={() => setShowPassword(!showPassword)}
                       />
                       <label
                           htmlFor="show-password"
                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                       >
                           Tampilkan password
                       </label>
                   </div>
                   <div className="mt-2">
                       <FormError message={error} />
                   </div>
                   <Button type="submit" disabled={isLoading}>Simpan password</Button>
               </form>
           </Form>
       </>
    )
}
