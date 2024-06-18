import { PublicKey } from "@solana/web3.js";
import { ConversionEvent } from "./conversion-event";

export type OfferMetadata = {
    conversionCount: number;
    title: string;
    description?: string;
    image?: string;
    link: string;
    startTime: number;
    endTime: number;
}
export type OfferReward = {
    rewardType: RewardType;
    amount: number;
    token?: PublicKey; // null for Points
}
export type CreateOfferParams = {
    audienceId: string;
    conversionEvent: ConversionEvent;
    publisherReward?: OfferReward;
    userReward?: OfferReward;
    raffleReward?: OfferReward;
    metadata: OfferMetadata;
}

export enum RewardType {
    POINTS = 'POINTS',
    TOKENS = 'TOKENS',
}