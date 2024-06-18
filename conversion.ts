import z from "zod";

export enum ConversionEventType {
  CLICK = "CLICK",
  SWAP = "SWAP",
  VOTE = "VOTE",
  PROGRAM_INTERACTION = "PROGRAM_INTERACTION",
  BURN = "BURN",
}

export type SwapConversion = {
  inTokenAddress?: string;
  inMinAmount?: number;
  outTokenAddress?: string;
  outMinAmount?: number;
};

export type VoteConversion = {
  proposal: string;
  // choice?: string; // TODO
};

export type ProgramInteractionConversion = {
  programAddress: string;
};

export type BurnConversion = {
  tokenAddress: string;
  minAmount?: number;
};

type ClickConversionEvent = {
  eventType: ConversionEventType.CLICK;
};

type SwapConversionEvent = {
  eventType: ConversionEventType.SWAP;
  requirement: SwapConversion;
};

type VoteConversionEvent = {
  eventType: ConversionEventType.VOTE;
  requirement: VoteConversion;
};

type ProgramInteractionConversionEvent = {
  eventType: ConversionEventType.PROGRAM_INTERACTION;
  requirement: ProgramInteractionConversion;
};

type BurnConversionEvent = {
  eventType: ConversionEventType.BURN;
  requirement: BurnConversion;
};

// zod schemas for vonersion
export const schemaSwapConversion = z.object({
  inTokenAddress: z.string().optional(),
  inMinAmount: z.number().optional(),
  outTokenAddress: z.string().optional(),
  outMinAmount: z.number().optional(),
});

export const schemaVoteConversion = z.object({
  proposal: z.string(),
});

export const schemaProgramInteractionConversion = z.object({
  programAddress: z.string(),
});

export const schemaBurnConversion = z.object({
  tokenAddress: z.string(),
  minAmount: z.number().nullish(),
});

export const schemaConversionEvent = z.discriminatedUnion("eventType", [
  z.object({
    eventType: z.literal(ConversionEventType.CLICK),
  }),
  z.object({
    eventType: z.literal(ConversionEventType.SWAP),
    requirement: schemaSwapConversion,
  }),
  z.object({
    eventType: z.literal(ConversionEventType.VOTE),
    requirement: schemaVoteConversion,
  }),
  z.object({
    eventType: z.literal(ConversionEventType.PROGRAM_INTERACTION),
    requirement: schemaProgramInteractionConversion,
  }),
  z.object({
    eventType: z.literal(ConversionEventType.BURN),
    requirement: schemaBurnConversion,
  }),
]);

export type ConversionEvent = z.infer<typeof schemaConversionEvent>;
