import { LimitsSettings } from 'api/limits'

export type ChangeLimitsState =
  | {
    type: "LOADING"
  }
  | {
    type: "LISTING"
    settings: LimitsSettings
  }
  | {
    type: "DAILY_AMOUNT_FORM"
    settings: LimitsSettings
  }
  | {
    type: "MONTHLY_AMOUNT_FORM"
    settings: LimitsSettings
  }
  | {
    type: "VERIFICATION_METHOD_FORM"
    settings: LimitsSettings
  }
  | {
    type: "TOKEN"
    settings: LimitsSettings
    tokenId: string
    instruction: string
  }
  | {
    type: "TOKEN_INVALID"
    settings: LimitsSettings
    tokenId: string
    instruction: string
  }
  | {
    type: "SUCCESS"
  }
