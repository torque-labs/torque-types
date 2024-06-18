export enum ConversionEventType {
    CLICK = "CLICK",
    TRANSACTION = "TRANSACTION"
}
export type ConversionEvent = {
    eventType: ConversionEventType;
    requirement?: ActionRequirements | StakedSolRequirements | OpenPositionRequirements | TokenHoldingRequirements; // null for click
}

/**
 * The type of action that will be used to filter the addresses for a target.
 */
export enum ActionType {
    SWAP = 'SWAP',
    VOTE = 'VOTE',
    PROGRAM_INTERACTION = 'PROGRAM_INTERACTION',
    NFT_MINT = 'NFT_MINT',
    BRIDGE = 'BRIDGE',
}

/**
 * Parameters for a swap action.
 */
export type SwapAction = {
    inTokenAddress?: string;
    inMinAmount?: number;
    outTokenAddress?: string;
    outMinAmount?: number;
};

/**
 * Parameters for a bridge action.
 */
export type BridgeAction = {
    direction: 'INBOUND' | 'OUTBOUND';
    mint: string;
    minAmount?: number;
    maxAmount?: number;
    withinDays?: number;
};

/**
 * Parameters for a program interaction action.
 */
export type ProgramInteractionAction = {
    programAddresses: string[];
    interactions?: number;
    withinDays?: number;
};

/**
 * Parameters for a vote action.
 */
export type VoteAction = {
    proposal: string;
    // choice?: string; // TODO
};

/**
 * Parameters for a NFT mint action.
 */
export type NftMintAction = {
    collectionAddress: string;
};

/**
 * Swap action requirements.
 */
export type SwapActionRequirements = {
    action: ActionType.SWAP;
    requirement: SwapAction;
};

/**
 * Vote action requirements.
 */
export type VoteActionRequirements = {
    action: ActionType.VOTE;
    requirement: VoteAction;
};

/**
 * Program interaction action requirements.
 */
export type ProgramInteractionActionRequirements = {
    action: ActionType.PROGRAM_INTERACTION;
    requirement: ProgramInteractionAction;
};

/**
 * Nft mint action requirements.
 */
export type NftMintActionRequirements = {
    action: ActionType.NFT_MINT;
    requirement: NftMintAction;
};

/**
 * Bridge action requirements.
 */
export type BridgeActionRequirements = {
    action: ActionType.BRIDGE;
    requirement: BridgeAction;
};

/**
 * Action requirements input.
 */
export type ActionRequirements =
    | SwapActionRequirements
    | VoteActionRequirements
    | ProgramInteractionActionRequirements
    | NftMintActionRequirements
    | BridgeActionRequirements;

/**
 * Staked sol requirements input.
 */
export type StakedSolRequirements = {
    validatorAddress?: string;
    minAmount: number;
    maxAmount?: number;
};

/**
 * Open position requirements input.
 */
export type OpenPositionRequirements = {
    tokenAddress: string;
    programAddress?: string;
    minAmount?: number;
    maxAmount?: number;
};

/**
 * Token holding requirements input.
 */
export type TokenHoldingRequirements = {
    tokenAddress?: string;
    collectionAddress?: string;
    minAmount?: number;
    maxAmount?: number;
};