// The target of an audience.
export type Target = TokenHoldingTarget | OpenPositionTarget | StakedSolTarget | SwapTarget | BridgeTarget | ProgramInteractionTarget | VoteTarget | NftMintTarget;

export enum TargetType {
    TOKEN_HOLDING = 'TOKEN_HOLDING',
    OPEN_POSITION = 'OPEN_POSITION',
    STAKED_SOL = 'STAKED_SOL',
    SWAP = 'SWAP',
    MINT_NFT = 'MINT_NFT',
    VOTE = 'VOTE',
    PROGRAM_INTERACTION = 'PROGRAM_INTERACTION',
    NFT_MINT = 'NFT_MINT',
    BRIDGE = 'BRIDGE',
}

// TOKEN HOLDING
export type TokenHoldingTarget = {
    targetType: TargetType.TOKEN_HOLDING;
    requirement: TokenHoldingRequirements;
};
export type TokenHoldingRequirements = {
    tokenAddress?: string;
    collectionAddress?: string;
    minAmount?: number;
    maxAmount?: number;
};

// OPEN POSITION
export type OpenPositionTarget = {
    targetType: TargetType.OPEN_POSITION;
    requirement: OpenPositionRequirements;
};
export type OpenPositionRequirements = {
    tokenAddress: string;
    programAddress?: string;
    minAmount?: number;
    maxAmount?: number;
};

// STAKED SOL
export type StakedSolTarget = {
    targetType: TargetType.STAKED_SOL;
    requirement: StakedSolRequirements;
};
export type StakedSolRequirements = {
    validatorAddress?: string;
    minAmount: number;
    maxAmount?: number;
};

// SWAP
export type SwapTarget = {
    targetType: TargetType.SWAP;
    requirement: StakedSolRequirements;
};
export type SwapRequirements = {
    inTokenAddress?: string;
    inMinAmount?: number;
    outTokenAddress?: string;
    outMinAmount?: number;
};

// BRIDGE
export type BridgeTarget = {
    targetType: TargetType.BRIDGE;
    requirement: StakedSolRequirements;
};
export type BridgeRequirements = {
    direction: 'INBOUND' | 'OUTBOUND';
    mint: string;
    minAmount?: number;
    maxAmount?: number;
    withinDays?: number;
};

// PROGRAM INTERACTION
export type ProgramInteractionTarget = {
    targetType: TargetType.BRIDGE;
    requirement: StakedSolRequirements;
};
export type ProgramInteractionRequirement = {
    programAddresses: string[];
    interactions?: number;
    withinDays?: number;
};

// VOTE
export type VoteTarget = {
    targetType: TargetType.VOTE;
    requirement: VoteRequirements;
};
export type VoteRequirements = {
    proposal: string;
    // choice?: string; // TODO
};

// NFT MINT
export type NftMintTarget = {
    targetType: TargetType.NFT_MINT;
    requirement: NftMintRequirements;
};
export type NftMintRequirements = {
    collectionAddress: string;
};
