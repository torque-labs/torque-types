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

export type ConversionEvent =
  | ClickConversionEvent
  | SwapConversionEvent
  | VoteConversionEvent
  | ProgramInteractionConversionEvent
  | BurnConversionEvent;
