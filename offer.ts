import { PublicKey } from "@solana/web3.js";
import { ConversionEvent } from "./conversion";
import { Audience } from "./audience";

export type OfferMetadata = {
    conversionCount: number;
    title: string;
    description?: string;
    image?: string;
    link: string;
    startTime: number;
    endTime: number;
}
export enum RewardType {
    POINTS = 'POINTS',
    TOKENS = 'TOKENS',
}
export type OfferReward = {
    rewardType: RewardType;
    amount: number;
    token?: PublicKey; // null for Points
}
export type CreateOffer = {
    offerMetadata: OfferMetadata;
    publsiherReward: OfferReward;
    userRewards: OfferReward;
    raffleRewards: OfferReward;
    audience: Audience;
    conversionEvent: ConversionEvent;
}