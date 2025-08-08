import { z } from 'zod'

export const TransactionMappingSchema = z.object({
   transaction_name: z.string().or(z.literal('')),
})
  

