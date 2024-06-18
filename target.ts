import { z } from 'zod';

// Enums
export enum TargetType {
  TOKEN_HOLDING = "TOKEN_HOLDING",
  OPEN_POSITION = "OPEN_POSITION",
  STAKED_SOL = "STAKED_SOL",
  SWAP = "SWAP",
  MINT_NFT = "MINT_NFT",
  VOTE = "VOTE",
  PROGRAM_INTERACTION = "PROGRAM_INTERACTION",
  NFT_MINT = "NFT_MINT",
  BRIDGE = "BRIDGE",
}

// TOKEN HOLDING
const schemaTokenHoldingRequirements = z.object({
  tokenAddress: z.string().optional(),
  collectionAddress: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
});

const schemaTokenHoldingTarget = z.object({
  targetType: z.literal(TargetType.TOKEN_HOLDING),
  requirement: schemaTokenHoldingRequirements,
});

// OPEN POSITION
const schemaOpenPositionRequirements = z.object({
  tokenAddress: z.string(),
  programAddress: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
});

const schemaOpenPositionTarget = z.object({
  targetType: z.literal(TargetType.OPEN_POSITION),
  requirement: schemaOpenPositionRequirements,
});

// STAKED SOL
const schemaStakedSolRequirements = z.object({
  validatorAddress: z.string().optional(),
  minAmount: z.number(),
  maxAmount: z.number().optional(),
});

const schemaStakedSolTarget = z.object({
  targetType: z.literal(TargetType.STAKED_SOL),
  requirement: schemaStakedSolRequirements,
});

// SWAP
const schemaSwapRequirements = z.object({
  inTokenAddress: z.string().optional(),
  inMinAmount: z.number().optional(),
  outTokenAddress: z.string().optional(),
  outMinAmount: z.number().optional(),
});

const schemaSwapTarget = z.object({
  targetType: z.literal(TargetType.SWAP),
  requirement: schemaSwapRequirements,
});

// BRIDGE
const schemaBridgeRequirements = z.object({
  direction: z.enum(["INBOUND", "OUTBOUND"]),
  mint: z.string(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  withinDays: z.number().optional(),
});

const schemaBridgeTarget = z.object({
  targetType: z.literal(TargetType.BRIDGE),
  requirement: schemaBridgeRequirements,
});

// PROGRAM INTERACTION
const schemaProgramInteractionRequirement = z.object({
  programAddresses: z.array(z.string()),
  interactions: z.number().optional(),
  withinDays: z.number().optional(),
});

const schemaProgramInteractionTarget = z.object({
  targetType: z.literal(TargetType.PROGRAM_INTERACTION),
  requirement: schemaProgramInteractionRequirement,
});

// VOTE
const schemaVoteRequirements = z.object({
  proposal: z.string(),
  // choice: z.string().optional(), // TODO
});

const schemaVoteTarget = z.object({
  targetType: z.literal(TargetType.VOTE),
  requirement: schemaVoteRequirements,
});

// NFT MINT
const schemaNftMintRequirements = z.object({
  collectionAddress: z.string(),
});

const schemaNftMintTarget = z.object({
  targetType: z.literal(TargetType.NFT_MINT),
  requirement: schemaNftMintRequirements,
});

// Union Type for Target
export const schemaTarget = z.discriminatedUnion('targetType', [
  schemaTokenHoldingTarget,
  schemaOpenPositionTarget,
  schemaStakedSolTarget,
  schemaSwapTarget,
  schemaBridgeTarget,
  schemaProgramInteractionTarget,
  schemaVoteTarget,
  schemaNftMintTarget,
]);

export type Target = z.infer<typeof schemaTarget>;