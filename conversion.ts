export enum ConversionEventType {
    CLICK = "CLICK",
    SWAP = "SWAP",
    VOTE = "VOTE",
    PROGRAM_INTERACTION = "PROGRAM_INTERACTION",
    BURN = "BURN"
}
export type ConversionEvent = {
    eventType: ConversionEventType;
    requirement?: SwapConversion | VoteConversion | ProgramInteractionConversion | BurnConversion; // null for click
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
    programAddress: string
};
export type BurnConversion = {
    tokneAddress: string,
    minAmount?: number,
};