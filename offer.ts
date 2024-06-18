import { z } from "zod";
import { Audience } from "./audience";
import { ConversionEvent } from "./conversion";

export const schemaOfferMetadata = z.object({
  conversionCount: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
  link: z.string(),
  startTime: z.number(),
  endTime: z.number(),
});
export type OfferMetadata = z.infer<typeof schemaOfferMetadata>;

export enum RewardType {
  POINTS = "POINTS",
  TOKENS = "TOKENS",
}

export const schemaOfferReward = z.discriminatedUnion("rewardType", [
  z.object({
    rewardType: z.literal(RewardType.POINTS),
    amount: z.number(),
  }),
  z.object({
    rewardType: z.literal(RewardType.TOKENS),
    amount: z.number(),
    token: z.string(),
  }),
]);
export type OfferReward = z.infer<typeof schemaOfferReward>;
