import { API_URL } from "@/consts"
import { OrganizationT, OrganizationsT } from "@/types/types";

export const createOrganization = async (value: { name: string, description: string }): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value.name,
                description: value.description
            })
        });

        if (response.ok) {
            return true;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
        }
    } catch (error) {
        console.error('Network error:', error);
        return false;
    }
};

export const getOrganizationsWithSorteos = async (): Promise<OrganizationsT | false> => {
    const res = await fetch(`${API_URL}/organization`)
    if (res.ok) return res.json()
    return false
}

export const getOrganizationById = async (id: string): Promise<false | OrganizationT> => {
    const res = await fetch(`${API_URL}/organization/${id}`)
    if (!res.ok) return false
    const organization = await res.json()

    if (res.ok) return organization[0]
    return false
}


