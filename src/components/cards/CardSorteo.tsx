import { SorteoT } from "@/types/types"

export const CardSorteo = ({ sorteo }: { sorteo: SorteoT }) => {
    return (
        <div>
            <h2>{sorteo.name}</h2>
        </div>
    )
}