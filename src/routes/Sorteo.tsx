import { SorteoT } from "@/types/types";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { ScreenError } from "./ScreenError";
import { getSorteoById } from "@/services/raffle";

export const Sorteo = () => {
    const { id } = useParams()
    if (typeof id !== 'string') {
        return (
            <ScreenError error={'Invalid ID'} description={'ID must be typeof UUID, example: f7b74c7d-a047-4684-a1f7-89670208c495'} />
        )
    }
    const location = useLocation();
    const { state } = location;
    console.log("state");
    console.log(state);

    const [loading, setLoading] = useState(false)
    const [sorteo, setSorteo] = useState<SorteoT>(state)

    useEffect(() => {
        const getsorteoDetail = async () => {
            setLoading(true)
            const sorteo = await getSorteoById(id)
            console.log("sorteo");
            console.log(sorteo);

            setLoading(false)
            if (sorteo) setSorteo(sorteo)
        }

        if (!sorteo) {
            if (id) getsorteoDetail()
        }

    }, [])

    if (!loading && !sorteo) return (<ScreenError error="sorteo not found" description="Possibly sorteo can't be found by id" />)

    return (
        <div className="container mt-20 mb-20">
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin" />)}
            <div>
                <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">{sorteo?.name}</h1>
                <p>{sorteo?.description}</p>
                <div className="mt-16"></div>
            </div>

        </div>
    )
}