import { z } from 'zod';
import { schemaTarget } from './target';

export enum Operation {
  AND = "AND",
  OR = "OR",
}

export const schemaAudience = z.lazy(() =>
  z.object({
    operation: z.nativeEnum(Operation),
    audiences: z.array(z.object({
      operation: z.nativeEnum(Operation),
      targets: z.array(schemaTarget),
    })),
    targets: z.array(schemaTarget),
  })
);
export type Audience = z.infer<typeof schemaAudience>;