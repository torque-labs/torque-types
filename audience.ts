import { ActionRequirements, OpenPositionRequirements, StakedSolRequirements, TokenHoldingRequirements } from "./conversion-event";

/**
 * Audiences are used to define the conditions under which a user can participate in a campaign.
 */
export type Audience = {
    operation: Operation;
    audiences: Audience[];
    targets: Target[];
};

/**
 * The operation type of an audience.
 */
export enum Operation {
    AND = 'AND',
    OR = 'OR',
}

/**
 * The target of an audience.
 */
export type Target = TokenHoldingTarget | ActionTarget | OpenPositionTarget | StakedSolTarget;

/**
 * The target type of an audience.
 */
export enum TargetType {
    TOKEN_HOLDING = 'TOKEN_HOLDING',
    ACTION = 'ACTION',
    OPEN_POSITION = 'OPEN_POSITION',
    STAKED_SOL = 'STAKED_SOL',
}

/**
 * A token holding target for an audience.
 */
export type TokenHoldingTarget = {
    targetType: TargetType.TOKEN_HOLDING;
    requirement: TokenHoldingRequirements;
};

/**
 * An action target for an audience.
 */
export type ActionTarget = {
    targetType: TargetType.ACTION;
    requirement: ActionRequirements;
};

/**
 * An open position target for an audience.
 */
export type OpenPositionTarget = {
    targetType: TargetType.OPEN_POSITION;
    requirement: OpenPositionRequirements;
};

/**
 * A staked sol target for an audience.
 */
export type StakedSolTarget = {
    targetType: TargetType.STAKED_SOL;
    requirement: StakedSolRequirements;
};