import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



export const Login = () => {




    const FormOrganization = () => {

        // 2. Define a submit handler.
        function onSubmit(values: z.infer<typeof formSchema>) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)

        }


        const formSchema = z.object({
            name: z.string().min(4, {
                message: "Organization name must be at least 4 characters.",
            }),
        })
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
            },
        })
        return (
            <div style={{ display: "flex" }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display organization name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        )
    }
    return (
        <div className="container">
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Login Screen</h1>
            <div className="mt-10"></div>
            <FormOrganization />
        </div>
    )
}
