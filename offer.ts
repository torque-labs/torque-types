export type OfferMetadata = {
  conversionCount: number;
  title: string;
  description?: string;
  image?: string;
  link: string;
  startTime: number;
  endTime: number;
};

export enum RewardType {
<<<<<<< Updated upstream
  POINTS = "POINTS",
  TOKENS = "TOKENS",
}

export type OfferReward =
  | {
      rewardType: RewardType.POINTS;
      amount: number;
    }
  | {
      rewardType: RewardType.TOKENS;
      amount: number;
      token: string;
    };

export type CreateOffer = {
  offerMetadata: OfferMetadata;
  publsiherReward: OfferReward;
  userRewards: OfferReward;
  raffleRewards: OfferReward;
  audience: Audience;
  conversionEvent: ConversionEvent;
};
=======
    POINTS = 'POINTS',
    TOKENS = 'TOKENS',
}
export type OfferReward = {
    rewardType: RewardType;
    amount: number;
    token?: string; // null for Points
}
>>>>>>> Stashed changes
