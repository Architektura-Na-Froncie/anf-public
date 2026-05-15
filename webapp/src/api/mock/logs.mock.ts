import { rest } from 'msw';

import { BASE_URL } from "env/config";

export const logsMockHandlers = [
  rest.post<never>(`${BASE_URL}/logs`, async (req, res, ctx) => {
    return res()
  }),
]
