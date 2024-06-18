import z from "zod";
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { Audience, schemaAudience } from "./audience";
import { ConversionEvent, ConversionEventType, schemaConversionEvent } from "./conversion";
import { OfferMetadata, OfferReward, schemaOfferMetadata, schemaOfferReward } from "./offer";

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
export type BuildAudienceWorkerRequest = z.infer<typeof schemaBuildAudienceWorkerRequest>;

export const schemaVerifyAudienceRequest = z.object({
  audience: schemaAudience,
  publicKey: z.string(),
});
export type VerifyAudienceRequest = z.infer<typeof schemaVerifyAudienceRequest>;

/**
 * API REQUESTS
 */

// /asymmetricReward
export const asymmetricRewardRequestSchema = z.object({
  campaignId: z.string(),
});
export type AsymmetricRewardRequest = z.infer<typeof asymmetricRewardRequestSchema>;

// /campaigns/:campaignId
export const getCampaignsRequestSchema = z.object({
  campaignId: z.string().optional(),
});
export type GetCampaignsRequest = z.infer<typeof getCampaignsRequestSchema>;

// /events
export const submitEventRequestSchema = z.object({
  pubKey: z.string(),
  type: z.string(), // Assuming ConversionEventType is a string enum or union
  campaignId: z.string(),
  publisherPubKey: z.string(),
  attributes: z.any().optional(),
  transaction: z.string(),
  rawTransactionData: z.any(),
});
export type SubmitEventRequest = z.infer<typeof submitEventRequestSchema>;

// /journey
export const getJourneyRequestSchema = z.object({
  conversionEvent: z.any(), // Assuming ConversionEvent is an object or specific type
});
export type GetJourneyRequest = z.infer<typeof getJourneyRequestSchema>;

export const submitJourneyRequestSchema = z.object({
  camapignId: z.string(),
  publsiherHandle: z.string(),
});
export type SubmitJourneyRequest = z.infer<typeof submitJourneyRequestSchema>;

// /leaderboards
export const getLeaderboardsRequestSchema = z.object({
  campaignId: z.string(),
});
export type GetLeaderboardsRequest = z.infer<typeof getLeaderboardsRequestSchema>;

// /login
export const loginRequestSchema = z.union([
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
export type LoginRequest = z.infer<typeof loginRequestSchema>;

// /offers
export const getOffersRequestSchema = z.object({
  publicKey: z.string(),
});
export type GetOffersRequest = z.infer<typeof getOffersRequestSchema>;

// /share
export const shareRequestSchema = z.object({
  handle: z.string(),
  campaignId: z.string(),
});
export type ShareRequest = z.infer<typeof shareRequestSchema>;

// /audience
export const getUserAudiencesRequestSchema = z.object({
  pubKey: z.string(),
});
export type GetUserAudiencesRequest = z.infer<typeof getUserAudiencesRequestSchema>;

// /audience/builder
export const createAudienceRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  config: schemaAudience,
});
export type CreateAudienceRequest = z.infer<typeof createAudienceRequestSchema>;

export const updateAudienceRequestSchema = z.object({
  config: schemaAudience.optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  id: z.string(),
});
export type UpdateAudienceRequest = z.infer<typeof updateAudienceRequestSchema>;

export const deleteAudienceRequestSchema = z.object({
  id: z.string(),
});
export type DeleteAudienceRequest = z.infer<typeof deleteAudienceRequestSchema>;

// /user/campaign
export const getUserCampaignsRequestSchema = z.object({
  publisher: z.string(),
});
export type GetUserCampaignsRequest = z.infer<typeof getUserCampaignsRequestSchema>;

// /user/journey
export const getUserJourneysRequestSchema = z.object({
  campaignId: z.string(),
});
export type GetUserJourneysRequest = z.infer<typeof getUserJourneysRequestSchema>;

// /audience/verify
// SEE: VerifyAudienceRequest above

// /tx/build
export const schemaCreateOfferRequest = z.object({
  metadata: schemaOfferMetadata,
  publsiherReward: schemaOfferReward,
  userRewards: schemaOfferReward,
  raffleRewards: schemaOfferReward.nullish(),
  audience: z.string(),
  conversionEvent: schemaConversionEvent,
});
export type CreateOfferRequest = z.infer<typeof schemaCreateOfferRequest>;

export const schemaEndOfferRequest = z.object({
  offerId: z.string(),
});
export type EndOfferRequest = z.infer<typeof schemaEndOfferRequest>;

export const schemaPayoutPublisherRequest = z.object({
  tokenAddress: z.string(),
  amount: z.number(),
});
export type PayoutPublisherRequest = z.infer<typeof schemaPayoutPublisherRequest>;

export const schemaCreatePublisherAccountRequest = z.boolean();
export type CreatePublisherAccountRequest = z.infer<typeof schemaCreatePublisherAccountRequest>;

export type BuildTransactionRewardRequest =
  | CreatePublisherAccountRequest
  | PayoutPublisherRequest
  | CreateOfferRequest
  | EndOfferRequest;

// /tx/execute
export const executeTransactionRequestSchema = z.union([
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
export type ExecuteTransactionRequest = z.infer<typeof executeTransactionRequestSchema>;
