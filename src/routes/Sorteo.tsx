import { GridNumber, GridNumbers, SorteoT } from "@/types/types";
import { Loader2 } from "lucide-react"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { ScreenError } from "./ScreenError";
import { getSorteoById } from "@/services/raffle";
import { RaffleNumber } from "@/components/number/RaffleNumber";
import { Button } from "@/components/ui/button";

export const Sorteo = () => {

    console.log('render grid');

    const { id } = useParams()
    if (typeof id !== 'string') {
        return (
            <ScreenError error={'Invalid ID'} description={'ID must be typeof UUID, example: f7b74c7d-a047-4684-a1f7-89670208c495'} />
        )
    }

    const [loading, setLoading] = useState(false)
    const [sorteo, setSorteo] = useState<SorteoT>()
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const hijoRef = useRef<number[]>(null);

    const handleClick = (number: number, addNumber: boolean) => {
        if (hijoRef.current) {
            console.log("hijoRef");
            console.log(hijoRef);
            hijoRef.current.modificarEstado(number, addNumber);
        }
    };


    useEffect(() => {
        const getsorteoDetail = async () => {
            setLoading(true)
            const sorteo = await getSorteoById(id)
            setLoading(false)
            if (sorteo) setSorteo(sorteo)
        }
        if (!sorteo && id) getsorteoDetail()
    }, [])


    if (!loading && !sorteo) return (<ScreenError error="sorteo not found" description="Possibly sorteo can't be found by id" />)

    const SectionGrid = () => {
        console.log('render section grid');

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
            setGridNumbers(gridNumbers)
        }, [])

        return (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-3 ">
                {(gridNumbers?.map((gridNumber) => (
                    <RaffleNumber gridNumber={gridNumber} handleClick={handleClick} />
                )))}
            </div>
        )
    }

    const handleSellNumbers = (selectedNumbers: number[]) => {
        console.log('handleSellNumbers');
    }

    const SectionSellNumber = forwardRef((props, ref) => {
        const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
        console.log('render hijo')

        useImperativeHandle(ref, () => ({
            modificarEstado(number: number, addNumber: boolean) {

                if (addNumber) setSelectedNumbers(prev => [...prev, number]);
                if (!addNumber) setSelectedNumbers(prev => prev.filter(n => n !== number));
            }
        }));

        const countNumbers = selectedNumbers.length
        if (countNumbers == 0) return (
            <h1 className="font-semibold tracking-tight text-2xl mt-10">No hay numeros seleccionados</h1>
        )
        return (
            <div className="mt-10">
                <h1 className="font-semibold tracking-tight text-2xl">Numeros seleccionados: {countNumbers}</h1>

                <div className="flex flex-row">

                    {(selectedNumbers.map((number, i) => {
                        if (i == countNumbers - 1) return (<h2>{number.toString()}</h2>)
                        return (<h2 className="mr-1">{number.toString()},</h2>)
                    }))}
                </div>
                <div className="mt-2" />
                <Button onClick={() => { handleSellNumbers(selectedNumbers) }}>
                    Sell Numbers
                </Button>
            </div>
        )
    });

    return (
        <div className="container pt-20 pb-20 bg-gradient-to-bl from-cyan-400 to-blue-500">
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin" />)}
            <div>
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{sorteo?.name}</h1>
                <p>{sorteo?.description}</p>
                <div className="mt-16"></div>
            </div>
            <SectionGrid />
            <SectionSellNumber ref={hijoRef} />

        </div>
    )
}