import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrganizationsWithSorteos } from "@/services/organization"
import { OrganizationT, OrganizationsT } from "@/types/types"
import { Loader2 } from "lucide-react"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Organizations = () => {


    const [loading, setLoading] = useState(false)
    const [organizations, setOrganizations] = useState<OrganizationsT>([])
    const navigate = useNavigate();


    const CardOrganization: FC<{ organization: OrganizationT }> = ({ organization }) => {

        return (
            <Card className="cursor-pointer hover:bg-[#eee] hover:drop-shadow-md max-w-[300px]" onClick={() => {
                navigate(`/organization/${organization.id}`, { state: organization })
            }}
            >
                <CardHeader>
                    <CardTitle>{organization.name}</CardTitle>
                    <CardDescription className="text-wrap truncate ... ...">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat autem nam voluptatum molestias praesentium sunt dicta, unde consequuntur, deserunt eos, deleniti itaque aut fugit. Optio voluptates rerum odit ab.</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        )
    }

    const OrganizationsSection = () => {

        console.log("organizations");
        console.log(organizations);

        return (
            <div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4" style={{ display: 'grid', flexDirection: 'row' }}>
                    {(organizations) && organizations.map((organization) => (
                        <CardOrganization organization={organization} />
                    ))}
                </div>

            </div>
        )
    }

    useEffect(() => {
        console.log('useEffect');

        const getOrganizations = async () => {
            setLoading(true)
            const organizations = await getOrganizationsWithSorteos()
            setLoading(false)
            if (organizations) {
                setOrganizations(organizations)
            }
        }
        getOrganizations()
    }, [])

    return (
        <div className="container mt-20 mb-20">
            <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">All Public Organizations</h1>
            <div className="mt-16" />
            {(loading) && (<Loader2 className="h-16 w-16 animate-spin mb-16" />)}
            <OrganizationsSection />
        </div>
    )
}
