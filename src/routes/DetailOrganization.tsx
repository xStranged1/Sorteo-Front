import { Button } from "@/components/ui/button";
import { getOrganizationsWithSorteos } from "@/services/organization";
import { OrganizationT } from "@/types/types";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

export const DetailOrganization = () => {
    const { id } = useParams()
    const location = useLocation();
    const { state } = location;

    const [loading, setLoading] = useState(false)
    const [organization, setOrganization] = useState<OrganizationT>(state)

    useEffect(() => {
        const getOrganizationDetail = () => {
            const organization = getOrganizationById(id)
        }
        if (!organization) {
            if (id) getOrganizationDetail
        }
    }, [])

    return (
        <div className="container mt-20 mb-20">
            <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">{organization.name}</h1>

            <div className="mt-16"></div>
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin" />)}
            {(organization.sorteos.length == 0) && (
                <div>
                    <h2>No tiene sorteos</h2>
                </div>
            )}
            <Link to='/sorteo/create-sorteo'>
                <Button>
                    Crear Sorteo
                </Button>
            </Link>

        </div>
    )
}