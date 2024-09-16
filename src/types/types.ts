import { UUID } from "crypto"
import { z } from "zod"

export interface OrganizationT {
    sorteos?: any,
    createdAt: string,
    id: string,
    name: string,
    description?: string
}
export type OrganizationsT = OrganizationT[]


export const formSorteoSchema = z.object({
    sorteoName: z.string().min(4, {
        message: "Sorteo name must be at least 4 characters.",
    }),
    description: z.string().max(1000, { message: "Too long..." }),
    dateStart: z.date(),
    numberCount: z.number({
        message: "Number count must be a number"
    }).min(0, {
        message: "Number count must be a positive number"
    }
    )
})



export interface SorteoT {
    id: {
        type: UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    numberCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    availableNumbers: {
        type: DataTypes.INTEGER,
    },
    dateStart: {
        type: DataTypes.DATEONLY,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    }
}