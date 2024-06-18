import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import { Audience } from './audience';
import { ConversionEvent, ConversionEventType } from "./conversion";
import { OfferMetadata, OfferReward } from './offer';

/**
 * FUNCTION REQUESTS
 */
export type BuildAudienceHandlerRequest = {
    audience: Audience
}
export type BuildAudienceWorkerRequest = {
    audience: Audience,
    skipCache?: boolean
}
export type VerifyAudienceRequest = {
    audience: Audience,
    publicKey: string
}

/**
 * API REQUESTS
 */

// /asymmetricReward
export type AsymmetricRewardRequest = {
    campaignId: string;
};

// /campaigns/:campaignId
export type GetCampaignsRequest = {
    campaignId?: string;
};

// /events
export type SubmitEventRequest = {
    pubKey: string;
    type: ConversionEventType;
    campaignId: string;
    publisherPubKey: string;
    attributes?: any;
    transaction: string;
    rawTransactionData: any
}

// /journey
export type GetJourneyRequest = {
    conversionEvent: ConversionEvent;
};
export type SubmitJourneyRequest = {
    camapignId: string;
    publsiherHandle: string;
}

// /leaderboards
export type GetLeaderboardsRequest = {
    campaignId: string;
};

// /login
export type LoginRequest =
    | {
        authType: 'siws';
        pubKey: string;
        payload: {
            input: SolanaSignInInput;
            output: SolanaSignInOutput;
        };
    }
    | {
        authType: 'basic';
        pubKey: string;
        payload: { input: string; output: string };
    };

// /offers
export type GetOffersRequest = {
    publicKey: string;
};

// /share
export type ShareRequest = {
    handle: string;
    campaignId: string;
};


// /audience
export type GetUserAudiencesResquest = {
    pubKey: string;
}


// /audience/builder
export type CreateAudienceRequest = {
    title: string;
    description?: string;
    config: Audience;
}
export type UpdateAudienceRequest = {
    config?: Audience;
    description?: string;
    name?: string;
    id: string
}
export type DeleteAudienceRequest = {
    id: string
}

// /user/campaign
export type GetUserCampaignsRequest = {
    publisher: string;
}

// /user/journey
export type GetUserJourneysRequest = {
    campaignId: string;
}

// /audience/verify
// SEE: VerifyAudienceRequest above

// /tx/build
export type CreateOfferRequest = {
    offerMetadata: OfferMetadata;
    publsiherReward: OfferReward;
    userRewards: OfferReward;
    raffleRewards: OfferReward;
    audience: Audience;
    conversionEvent: ConversionEvent;
}
export type EndOfferRequest = {
    offerId: string;
}
export type PayoutPublisherRequest = {
    tokenAddress: string;
    amount: number;
}
export type CreatePublisherAccountRequest = boolean;
export type BuildTransactionRewardRequest =
    | CreatePublisherAccountRequest
    | PayoutPublisherRequest
    | CreateOfferRequest
    | EndOfferRequest


// /tx/execute
export type ExecuteTransactionRequest = {
    userSignature: string;
    blockHash: string;
    campaignId: string;
}