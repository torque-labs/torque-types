import z from "zod";
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { Audience, schemaAudience } from "./audience";
import {
  ConversionEvent,
  ConversionEventType,
  schemaConversionEvent,
} from "./conversion";
import {
  OfferMetadata,
  OfferReward,
  schemaOfferMetadata,
  schemaOfferReward,
} from "./offer";

/**
 * FUNCTION REQUESTS
 */
export const schemaBuildAudienceRequest = z.object({
  audience: schemaAudience,
});
export type BuildAudienceRequest = z.infer<typeof schemaBuildAudienceRequest>;

export const schemaBuildAudienceWorkerRequest = z.object({
  audience: schemaAudience,
  skipCache: z.boolean().optional(),
});
export type BuildAudienceWorkerRequest = z.infer<
  typeof schemaBuildAudienceWorkerRequest
>;

export const schemaVerifyAudienceRequest = z.object({
  audience: schemaAudience,
  publicKey: z.string(),
});
export type VerifyAudienceRequest = z.infer<typeof schemaVerifyAudienceRequest>;

/**
 * API REQUESTS
 */

/**
 * CAMPAIGNS
 */

// /campaigns
export const schemaGetCampaignsRequest = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
});
export type GetCampaignsRequest = z.infer<typeof schemaGetCampaignsRequest>;

// /campaigns/:campaignId
export const schemaGetSingleCampaignRequest = z.object({
  campaignId: z.string().optional(),
});
export type GetSingleCampaignRequest = z.infer<
  typeof schemaGetCampaignsRequest
>;

// /asymmetricReward
export const schemaAsymmetricRewardRequest = z.object({
  campaignId: z.string(),
});
export type AsymmetricRewardRequest = z.infer<
  typeof schemaAsymmetricRewardRequest
>;

/**
 * EVENTS
 */

// /events

export const schemaSubmitEventRequest = z.object({
  pubKey: z.string(),
  type: z.nativeEnum(ConversionEventType),
  campaignId: z.string(),
  publisherKey: z.string(),
  attributes: z.record(z.string(), z.any()),
  transaction: z.string().optional(),
  rawTransactionData: z.any().optional(),
});

export type SubmitEventRequest = z.infer<typeof schemaSubmitEventRequest>;

// /journey
export const schemaGetJourneyRequest = z.object({
  userPubKey: z.string(),
  programAddress: z.string().optional(),
  eventType: z.nativeEnum(ConversionEventType).optional(),
  token: z.string().optional(),
  amount: z.string().optional(),
  proposal: z.string().optional(),
  collectionId: z.string().optional(),
  pubKey: z.string().optional(),
  limit: z.number().optional(),
});
export type GetJourneyRequest = z.infer<typeof schemaGetJourneyRequest>;

export const schemaSubmitJourneyRequest = z.object({
  camapignId: z.string(),
  publsiherHandle: z.string(),
});
export type SubmitJourneyRequest = z.infer<typeof schemaSubmitJourneyRequest>;

// /leaderboards
export const schemaGetLeaderboardsRequest = z.object({
  campaignId: z.string(),
});
export type GetLeaderboardsRequest = z.infer<
  typeof schemaGetLeaderboardsRequest
>;

// /login
export const schemaLoginRequest = z.union([
  z.object({
    authType: z.literal("siws"),
    pubKey: z.string(),
    payload: z.object({
      input: z.any(), // Assuming SolanaSignInInput is an object or specific type
      output: z.any(), // Assuming SolanaSignInOutput is an object or specific type
    }),
  }),
  z.object({
    authType: z.literal("basic"),
    pubKey: z.string(),
    payload: z.object({
      input: z.string(),
      output: z.string(),
    }),
  }),
]);
export type LoginRequest = z.infer<typeof schemaLoginRequest>;

// /offers
export const schemaGetOffersRequest = z.object({
  publicKey: z.string(),
});
export type GetOffersRequest = z.infer<typeof schemaGetOffersRequest>;

// /share
export const schemaShareRequest = z.object({
  handle: z.string(),
  campaignId: z.string(),
});
export type ShareRequest = z.infer<typeof schemaShareRequest>;

// /audience
export const schemaGetUserAudiencesRequest = z.object({
  pubKey: z.string(),
});
export type GetUserAudiencesRequest = z.infer<
  typeof schemaGetUserAudiencesRequest
>;

// /audience/builder
export const schemaCreateAudienceRequest = z.object({
  title: z.string(),
  description: z.string().optional(),
  config: schemaAudience,
});
export type CreateAudienceRequest = z.infer<typeof schemaCreateAudienceRequest>;

export const schemaUpdateAudienceRequest = z.object({
  config: schemaAudience.optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  id: z.string(),
});
export type UpdateAudienceRequest = z.infer<typeof schemaUpdateAudienceRequest>;

export const schemaDeleteAudienceRequest = z.object({
  id: z.string(),
});
export type DeleteAudienceRequest = z.infer<typeof schemaDeleteAudienceRequest>;

// /user/campaign
export const schemaGetUserCampaignsRequest = z.object({
  publisher: z.string(),
});
export type GetUserCampaignsRequest = z.infer<
  typeof schemaGetUserCampaignsRequest
>;

// /user/journey
export const schemaGetUserJourneysRequest = z.object({
  campaignId: z.string(),
});
export type GetUserJourneysRequest = z.infer<
  typeof schemaGetUserJourneysRequest
>;

// /audience/verify
// SEE: VerifyAudienceRequest above

// /tx/build
export const schemaCreateOfferRequest = z.object({
  createCamapign: z.object({
    metadata: schemaOfferMetadata,
    publsiherReward: schemaOfferReward,
    userRewards: schemaOfferReward,
    raffleRewards: schemaOfferReward.nullish(),
    audience: z.string(),
    conversionEvent: schemaConversionEvent,
  }),
});
export type CreateOfferRequest = z.infer<typeof schemaCreateOfferRequest>;

export const schemaEndOfferRequest = z.object({
  endCampaign: z.object({
    offerId: z.string(),
  }),
});
export type EndOfferRequest = z.infer<typeof schemaEndOfferRequest>;

export const schemaPayoutPublisherRequest = z.object({
  payoutPublisher: z.object({
    tokenAddress: z.string(),
    amount: z.number(),
  }),
});
export type PayoutPublisherRequest = z.infer<
  typeof schemaPayoutPublisherRequest
>;

export const schemaCreatePublisherAccountRequest = z.object({
  createPublisher: z.boolean(),
});
export type CreatePublisherAccountRequest = z.infer<
  typeof schemaCreatePublisherAccountRequest
>;

export const schemaBuildTransactionRequest = z.union([
  schemaCreatePublisherAccountRequest,
  schemaPayoutPublisherRequest,
  schemaCreateOfferRequest,
  schemaEndOfferRequest,
]);
export type BuildTransactionRequest = z.infer<
  typeof schemaBuildTransactionRequest
>;

// /tx/execute
export const schemaExecuteTransactionRequest = z.union([
  z.object({
    createCampaign: z.object({
      campaignId: z.string(),
      userSignature: z.string(),
      blockhash: z.string(),
    }),
  }),
  z.object({
    endCampaign: z.object({
      campaignId: z.string(),
      userSignature: z.string(),
      blockhash: z.string(),
    }),
  }),
  z.object({
    createPublisher: z.object({
      userSignature: z.string(),
      blockhash: z.string(),
    }),
  }),
  z.object({
    payoutPublisher: z.object({
      userSignature: z.string(),
      blockhash: z.string(),
    }),
  }),
]);
export type ExecuteTransactionRequest = z.infer<
  typeof schemaExecuteTransactionRequest
>;
