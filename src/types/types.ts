import { formatDate, isValidISO8601 } from "@/utils/formatDate"
import { z } from "zod"

export interface OrganizationT {
    sorteos: SorteoT[] | [],
    createdAt: string,
    id: string,
    name: string,
    description?: string
}

export interface User {
    id: string;
    name: string;
    phone: string;
    createdAt: string;
    updatedAt?: string;
    // SorteoUser: {
    //     createdAt: string; 
    //     updatedAt: string; 
    //     sorteoId: string;
    //     userId: string;
    // };
}

export interface Seller {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    // SorteoSeller: {
    //     createdAt: string; 
    //     updatedAt: string;
    //     sorteoId: string; 
    //     sellerId: string; 
    // };
}

export interface GridNumber {
    number: number,
    isSelected?: boolean,
    raffleNumber?: RaffleNumber
}

export type GridNumbers = GridNumber[]

export interface RaffleNumber {
    id: string;
    number: number;
    createdAt: string;
    updatedAt?: string;
    sorteoId: string;
    userId: string;
    sellerId: string;
}

export interface SorteoT {
    id: number,
    name: string,
    description?: string
    numberCount: string,
    availableNumbers: string,
    createdAt?: string,
    updatedAt: string;
    organizationId: string;
    raffleNumbers: RaffleNumber[];
    users: User[];
    sellers: Seller[];
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
    description: z.string().max(1000, { message: "Too long..." }).optional(),
    numberCount: z
        .preprocess((val) => Number(val), z.number().min(1, {
            message: "Number count must be a positive number",
        })),
    startDate: z.date()
        .transform((val) => formatDate(val))
        .refine(isValidISO8601, 'Date is invalid')
        .optional()
})