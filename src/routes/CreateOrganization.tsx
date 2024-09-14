import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Link, useNavigate } from "react-router-dom"
import { createOrganization } from "@/services/organization"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


export function CreateOrganization() {

    const { toast } = useToast()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)



    const handleCreateOrganization = async (value: z.infer<typeof formSchema>) => {
        console.log("await");
        const isOk = await createOrganization(value)
        setLoading(false)
        if (!isOk) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return
        }
        toast({
            variant: "default",
            style: { backgroundColor: "#23c55c" },
            title: "Successfully",
            description: "The Organization was created",
            action: <ToastAction onClick={() => navigate('/home', { replace: true })} altText="Go home">Go Home</ToastAction>,
        })
        return
    }
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        handleCreateOrganization(values)
    }


    const formSchema = z.object({
        name: z.string().min(4, {
            message: "Organization name must be at least 4 characters.",
        }),
        description: z.string().max(1000, { message: "Too long..." })
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "sasa",
            description: ""
        },
    })



    return (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create a organization</CardTitle>
                    <CardDescription>Easy deploy your new organization </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >

                            <div className="grid w-full items-center gap-4">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (

                                        <FormItem>
                                            <div className="flex flex-col space-y-1.5">
                                                <FormLabel>Organization name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display organization name.
                                                </FormDescription>
                                            </div>
                                            <FormMessage />

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col space-y-1.5">
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about the organization"
                                                        className="resize-none h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public organization description.
                                                </FormDescription>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <CardFooter className="flex justify-between mt-5" style={{ marginBottom: -15 }}>
                                <Link to='/'><Button variant="outline">Cancel</Button></Link>

                                <Button type="submit" onSubmit={() => setLoading(true)} disabled={loading}>
                                    {(loading) && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                                    Create
                                </Button>
                            </CardFooter>

                        </form>
                    </Form>

                </CardContent>

            </Card>
        </div>

    )
}
