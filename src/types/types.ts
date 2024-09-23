import { formatDate, isValidISO8601 } from "@/utils/formatDate"
import { z } from "zod"

export interface OrganizationT {
    sorteos: SorteoT[] | [],
    createdAt: string,
    id: string,
    name: string,
    description?: string
}

export interface SorteoT {
    id: number,
    name: string,
    description?: string
    numberCount: string,
}

export type OrganizationsT = OrganizationT[]

export interface ErrorT {
    error: string,
    description?: string
}

export const formSorteoSchema = z.object({
    organizationId: z.string(),
    sorteoName: z.string().min(4, {
        message: "Sorteo name must be at least 4 characters.",
    }),
    description: z.string().max(1000, { message: "Too long..." }),
    numberCount: z
        .preprocess((val) => Number(val), z.number().min(0, {
            message: "Number count must be a positive number",
        })),
    startDate: z.preprocess((val) => formatDate(val), z.string().refine(isValidISO8601, {
        message: 'Start date is invalid'
    }))
    ,
})