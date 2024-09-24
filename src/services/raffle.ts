import { API_URL } from "@/consts";
import { SorteoT, formSorteoSchema } from "@/types/types";
import { z } from "zod";

export const createRaffle = async (value: z.infer<typeof formSorteoSchema>): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/sorteo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                organizationId: value.organizationId,
                name: value.sorteoName,
                dateStart: value.startDate,
                numberCount: value.numberCount,
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

export const getSorteoById = async (id: string): Promise<false | SorteoT> => {
    const res = await fetch(`${API_URL}/sorteo/${id}`)
    if (!res.ok) return false
    const sorteo = await res.json()

    if (res.ok) return sorteo[0]
    return false
}
