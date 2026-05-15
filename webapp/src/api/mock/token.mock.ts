import { rest } from 'msw';

import { BASE_URL } from "env/config";
import { TokenConfirmation, TokenInstruction } from "api/token";

const errorResponse = {
  id: '1111-2222-3333-4444',
  code: 'INVALID_TOKEN',
  message: `Invalid confirmation token!`
}

export const tokenMockHandlers = [
  rest.post<never, never, TokenInstruction>(`${BASE_URL}/banking/token`, async (req, res, ctx) => {
    return res(
      ctx.json({
        instruction: "Wpisz hasło SMS",
        tokenId: "1111-2222-3333-4444"
      }),
    )
  }),
  rest.post<TokenConfirmation, { tokenId: string }>(`${BASE_URL}/banking/token/:tokenId`, async (req, res, ctx) => {
    const { tokenId } = req.params

    if (req.body.tokenCode.length !== 4){
      return res(
        ctx.status(401),
        ctx.json(errorResponse as any),
      )
    }

    return res(
      ctx.json(undefined),
    )
  }),
]
