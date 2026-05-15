import { rest } from 'msw';

import { BASE_URL } from "env/config";
import { TokenConfirmation, TokenInstruction } from "api/token";

export const tokenMockNetworkErrorHandlers = [
  rest.post<never, never, TokenInstruction>(`${BASE_URL}/banking/token`, async (req, res, ctx) => {
    return res.networkError('Failed to connect')
  }),
  rest.post<TokenConfirmation, { tokenId: string }>(`${BASE_URL}/banking/token/:tokenId`, async (req, res, ctx) => {
    return res.networkError('Failed to connect')
  }),
]
