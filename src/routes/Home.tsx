import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export const Home = () => {

    const { toast } = useToast()

    return (
        <div className="container">
            <Button>Click me</Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                }}
            >
                Show Toast
            </Button>

            <h2>Home</h2>
            <p className="font-geist-sans">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta commodi sed placeat ipsum maiores aperiam necessitatibus recusandae optio dolorem, sapiente veniam suscipit ex deserunt illo quia doloribus in! Animi, quod.</p>
        </div>
    )
}
