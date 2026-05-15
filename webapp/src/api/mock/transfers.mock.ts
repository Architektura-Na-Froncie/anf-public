import { rest } from 'msw';

import { BASE_URL } from 'env/config';
import { Transfer } from 'api/transfers';

import mockJSON from './transfers.mock.json';

export const transfersJSON: Transfer[] = mockJSON;

export const transfersMockHandlers = [
  rest.get<never, never, Transfer[]>(`${BASE_URL}/account/transfers`, async (req, res, ctx) => {
    return res(
      ctx.json(transfersJSON),
    )
  }),
]

export const transfersMockHandlersWithSpy = (spy: jest.Mock) => [
  rest.get<never, never, Transfer[]>(`${BASE_URL}/account/transfers`, async (req, res, ctx) => {
    // msw tworząc request ustawia niedeterministyczne id (uuid), które z oczywistyczh
    // względów nie współpracuje ze snapshotami.
    req.id = '';

    spy(req)
    return res(
      ctx.json(transfersJSON),
    )
  }),
]
