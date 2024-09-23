import { Button } from "@/components/ui/button";
import { getOrganizationById } from "@/services/organization";
import { OrganizationT, SorteoT } from "@/types/types";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { ScreenError } from "./ScreenError";
import { CardSorteo } from "@/components/cards/CardSorteo";

export const DetailOrganization = () => {
    const { id } = useParams()
    if (typeof id !== 'string') {
        return (
            <ScreenError error={'Invalid ID'} description={'ID must be typeof UUID, example: f7b74c7d-a047-4684-a1f7-89670208c495'} />
        )
    }
    const location = useLocation();
    const { state } = location;

    const [loading, setLoading] = useState(false)
    const [organization, setOrganization] = useState<OrganizationT>(state)

    useEffect(() => {
        const getOrganizationDetail = async () => {
            setLoading(true)
            const organization = await getOrganizationById(id)
            console.log("organization");
            console.log(organization);

            setLoading(false)
            if (organization) setOrganization(organization)
        }

        if (!organization) {
            if (id) getOrganizationDetail()
        }

    }, [])

    const SectionSorteos = ({ sorteos }: { sorteos: SorteoT[] }) => {

        if (sorteos.length == 0) return (
            <div>
                <h2>No hay sorteos</h2>
            </div>
        )

        return (
            <div>
                {(sorteos.map((sorteo) => (
                    <div key={sorteo.id}>
                        <CardSorteo sorteo={sorteo} />
                    </div>
                )))}
            </div>
        )
    }

    const SectionOrganization = () => {
        const sorteos = organization.sorteos

        return (

            <div>
                <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">{organization?.name}</h1>
                <p>{organization?.description}</p>
                <div className="mt-16"></div>
                <SectionSorteos sorteos={sorteos} />
            </div>
        )

    }
    if (!loading && !organization) return (<ScreenError error="Organization not found" description="Possibly organization can't be found by id" />)

    return (
        <div className="container mt-20 mb-20">
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin" />)}
            <SectionOrganization />
            <Link to='/sorteo/create-sorteo' state={organization}>
                <Button>
                    Crear Sorteo
                </Button>
            </Link>

        </div>
    )
}