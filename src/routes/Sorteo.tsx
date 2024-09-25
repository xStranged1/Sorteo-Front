import { GridNumber, GridNumbers, SorteoT } from "@/types/types";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ScreenError } from "./ScreenError";
import { getSorteoById } from "@/services/raffle";

export const Sorteo = () => {
    const { id } = useParams()
    if (typeof id !== 'string') {
        return (
            <ScreenError error={'Invalid ID'} description={'ID must be typeof UUID, example: f7b74c7d-a047-4684-a1f7-89670208c495'} />
        )
    }



    const [loading, setLoading] = useState(false)
    const [sorteo, setSorteo] = useState<SorteoT>()

    useEffect(() => {

        const getsorteoDetail = async () => {
            setLoading(true)
            const sorteo = await getSorteoById(id)
            console.log("sorteo");
            console.log(sorteo);
            setLoading(false)
            if (sorteo) setSorteo(sorteo)
        }

        if (!sorteo && id) getsorteoDetail()

    }, [])

    if (!loading && !sorteo) return (<ScreenError error="sorteo not found" description="Possibly sorteo can't be found by id" />)

    const SectionGrid = () => {

        const [gridNumbers, setGridNumbers] = useState<GridNumbers>()

        const getRaffleNumbers = () => {
            if (!sorteo) return
            const raffleNumbers = sorteo.raffleNumbers
            let gridNumbers: GridNumbers = []
            for (let i = 0; i < parseInt(sorteo.numberCount, 10); i++) {
                let objGridNumber: GridNumber = { number: i + 1 }
                gridNumbers.push(objGridNumber)
            }

            raffleNumbers.forEach(raffleNumber => {
                gridNumbers[raffleNumber.number - 1] = { number: raffleNumber.number, raffleNumber: raffleNumber }
            });
            return gridNumbers
        }

        useEffect(() => {
            const gridNumbers = getRaffleNumbers()
            console.log("gridNumbers");
            console.log(gridNumbers);

            setGridNumbers(gridNumbers)
        }, [])

        return (
            <div className="grid grid-flow-row grid-cols-5 gap-1 r ">
                {(gridNumbers?.map((gridNumber) => (
                    <div key={gridNumber.number} className="bg-orange-200 p-2">
                        <p className="font-semibold first:mt-0 ">{gridNumber.number}</p>
                        <p className="font-semibold first:mt-0 ">{(gridNumber.raffleNumber ? 'Selled' : '')}</p>
                    </div>
                )))}
            </div>
        )
    }
    return (
        <div className="container mt-20 mb-20">
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin" />)}
            <div>
                <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">{sorteo?.name}</h1>
                <p>{sorteo?.description}</p>
                <div className="mt-16"></div>
            </div>
            <SectionGrid />

        </div>
    )
}