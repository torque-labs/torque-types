import { Target } from "./target";

// Audiences are used to define the conditions under which a user can participate in a campaign.
export type Audience = {
  operation: Operation;
  audiences: Audience[];
  targets: Target[];
};
// The operation type of an audience.
export enum Operation {
  AND = "AND",
  OR = "OR",
}
