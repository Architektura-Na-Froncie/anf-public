import { rest } from 'msw';

import { BASE_URL } from "env/config";
import { LimitsSettings, SendLimitsUpdateResponse, VerificationMethod } from 'api/limits';

export const limitsState = {
  dailyLimit: 789,
  availableDailyAmount: 123,
  monthlyLimit: 5000,
  availableMonthlyAmount: 4334,
  verificationMethod: "SMS-CODE" as VerificationMethod
}

export const limitsMockHandlers = [
  rest.get<never, never, LimitsSettings>(`${BASE_URL}/banking/limits`, async (req, res, ctx) => {
    return res(
      ctx.json(limitsState),
    )
  }),
  rest.post<never, never, SendLimitsUpdateResponse>(`${BASE_URL}/banking/limits`, async (req, res, ctx) => {
    return res(
      ctx.json({
        token: {
          instruction: "Podaj SMS kod",
          tokenId: "1111-2222-3333-4444",
        },
        settings: limitsState,
      }),
    )
  }),
]
