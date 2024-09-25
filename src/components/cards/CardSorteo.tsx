import { SorteoT } from "@/types/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatDate } from "@/utils/formatDate"
import { Hash, TicketCheck, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CardSorteo = ({ sorteo }: { sorteo: SorteoT }) => {

    const navigate = useNavigate()

    const goToSorteoDetail = () => {
        navigate(`/sorteo/${sorteo.id}`, { state: sorteo })
    }
    console.log("sorteo");
    console.log(sorteo);

    return (
        <div>
            <Card className="hover:bg-[#eee] hover:drop-shadow-md cursor-pointer" onClick={goToSorteoDetail}>
                <CardHeader className="flex flex-row justify-between items-center gap-5">
                    <CardTitle>{sorteo.name}</CardTitle>
                    <CardDescription>Created At: {formatDate(sorteo.createdAt)}</CardDescription>
                </CardHeader>
                {sorteo.description && (
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{sorteo.description}</p>
                    </CardContent>
                )}

                <CardFooter className="flex flex-row justify-start items-center gap-5">
                    <div className="flex">
                        <UserIcon size={20} />
                        <p className="text-sm ">4</p>
                    </div>
                    <div className="flex">
                        <Hash size={20} />
                        <p className="text-sm">{sorteo.numberCount}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-sm text-gray-600 mr-2">Numbers remaining: </p>
                        <TicketCheck size={22} />
                        <p className="text-sm ml-1"> {sorteo.availableNumbers}</p>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}