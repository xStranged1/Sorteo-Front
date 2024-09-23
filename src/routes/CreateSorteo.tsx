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
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { createRaffle } from "@/services/raffle"
import { formSorteoSchema } from "@/types/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { formatDate } from "@/utils/formatDate"


export function CreateSorteo() {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    if (!state) return (
        <div>
            <h2>Organization not found</h2>
        </div>
    )



    const handleCreateRaffle = async (value: z.infer<typeof formSorteoSchema>) => {
        console.log("await");
        const isOk = await createRaffle(value)
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
            description: "The Sorteo was created",
            action: <ToastAction onClick={() => navigate('/home', { replace: true })} altText="Go home">Go Home</ToastAction>,
        })
        return
    }

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSorteoSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        let date = values.startDate
        let formatedDate = formatDate(date)
        console.log(formatedDate);

        //handleCreateRaffle(values)
    }


    // 1. Define your form.

    const form = useForm<z.infer<typeof formSorteoSchema>>({
        resolver: zodResolver(formSorteoSchema),
        defaultValues: {
            organizationId: state.id,
            sorteoName: "",
            description: "",
            numberCount: 0,
        },
    })

    return (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Card className="w-[350px] mt-20 mb-20">
                <CardHeader>
                    <CardTitle>Create a Sorteo</CardTitle>
                    <CardDescription>Easy create a public sorteo</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >

                            <div className="grid w-full items-center gap-4">

                                <FormField
                                    control={form.control}
                                    name="sorteoName"
                                    render={({ field }) => (

                                        <FormItem>
                                            <div className="flex flex-col space-y-1.5">
                                                <FormLabel>Sorteo name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Spring raffle" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display sorteo name.
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
                                                        placeholder="Tell us a little bit about the sorteo"
                                                        className="resize-none h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public sorteo description.
                                                </FormDescription>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numberCount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col space-y-1.5">
                                                <FormLabel>Total number count</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="500" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Total number count
                                                </FormDescription>
                                            </div>
                                            <FormMessage />

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of birth</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Your date of birth is used to calculate your age.
                                            </FormDescription>
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
