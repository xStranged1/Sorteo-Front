import { GridNumber } from "@/types/types"
import { MouseEventHandler, useState } from "react"

export const RaffleNumber = ({ gridNumber, handleClick }: { gridNumber: GridNumber, handleClick: Function }) => {

    const [isSelected, setIsSelected] = useState(false)

    const isSelled = gridNumber.raffleNumber

    const handleClickNumber = () => {
        if (isSelled) return
        setIsSelected(isSelected => !isSelected)
        if (!isSelected) handleClick(gridNumber.number, true)
        if (isSelected) handleClick(gridNumber.number, false)
    }

    return (
        <button key={gridNumber.number}
            className={`p-2 rounded cursor-pointer bg-slate-50
            ${(isSelled ? '' : 'hover:drop-shadow-md  hover:bg-slate-300 ')}
            ${(isSelected && !isSelled) ? 'bg-slate-400 hover:bg-slate-400 drop-shadow-lg ' : ''}`}
            onClick={handleClickNumber}>
            <p className={`font-semibold first:mt-0 
                        ${(isSelled ? 'line-through-thick text-red-800' : '')}`}>{gridNumber.number}</p>
        </button>
    )
}