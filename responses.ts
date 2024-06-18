/**
 * FUNCTION RESPONSES
 */
export type BuildAudienceHandlerResponse = {
  statusCode: number;
  body: {
    message: string;
    workerResult: {
      StatusCode: number;
      Payload: string;
    };
  };
};
export type BuildAudienceWorkerResponse = {
  statusCode: number;
  body: {
    message: string;
    audienceSize: number;
  };
};
export type VerifyAudienceResponse = {
  statusCode: number;
  body: {
    message: string;
    verified: boolean;
  };
};

/**
 * API RESPONSES
 */
export enum ApiStatus {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}
export type GetShareLinkResponse = {
  campaign: {
    id: string;
    title: string;
    type: string;
    targetLink?: string;
    startTime: Date;
    endTime: Date;
    advertiser: {
      username: string | null;
      twitter?: string | null;
      profileImage?: string | null;
    };
  };
  publisher: {
    username: string | null;
    twitter?: string | null;
    profileImage?: string | null;
  };
};
export type GetUserResponse = {
  pubKey: string;
  username?: string;
  twitter?: string;
  profileImage?: string;
  isPublisher: boolean;
  publisherPubKey?: string | null;
  token: string;
};
export type LoginResponse = {
  payload: {
    statement: string;
    issuedAt: string;
    expirationTime: string;
  };
};
export type TriggerAsymmetricRewardResponse = {
  winners: {
    userPubKey: string;
    amount: number;
    tokenAddress: string;
  }[];
};
// TX BUILD
export type BuildTransactionResponse = {
  status: ApiStatus;
  data: {
    serailizedTx: string;
  };
};
// TX EXECUTE
export type ExecuteTransactionResponse = {
  status: ApiStatus;
  data: {
    signature: string;
  };
};
