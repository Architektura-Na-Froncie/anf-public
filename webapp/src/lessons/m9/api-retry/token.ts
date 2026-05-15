import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as rax from 'retry-axios';
import { BASE_URL } from 'env/config';
import { isUnauthorizedError } from '../error-ui/messages/error-guards';
import { retryHTTP } from '../retryHTTP';

/**
 * UWAGA! 🔥
 *
 * W naszym repo szkoleniowym mamy osobny folder webapp/src/api, w którym są funkcje HTTP bez retry, a tu jest wersja z retry, bo dodaliśmy ją w tym module.
 * Normalnie raczej wszystkie API trzymalibyśmy w 1 miejscu dla porządku. Natomiast chcemy tutaj bardziej uwydatnić elementy _dodane_ do szkolenia w konkretnym module.
 */

const client = axios.create({ baseURL: BASE_URL });

// Alternatywnie możemy skorzystać z gotowego pluginu do ponawiania zapytań (https://www.npmjs.com/package/axios-retry)
// axiosRetry(client, { retries: 3 });
// axiosRetry(client, {
//   retries: 3,
//   retryDelay: axiosRetry.exponentialDelay
// });

// albo jeszcze innego (https://www.npmjs.com/package/retry-axios)
// client.defaults.raxConfig = {
//   instance: client,
//   retry: 3,
//   noResponseRetries: 3,
//   backoffType: 'exponential',
//   httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
//   statusCodesToRetry: [[100, 199], [400, 499], [500, 599]],
// };
// rax.attach(client);

export interface TokenInstruction {
  instruction: string
  tokenId: string
}

export const getTokenInstruction = retryHTTP(async () => {
  const response = await client.post<TokenInstruction>(`/banking/token`)
  return response.data
}, {
  maxAttempts: 3,
  backoff: () => 0
  // backoff: (attempt) => 1000 * attempt
})

export interface TokenConfirmation {
  tokenId: string
  tokenCode: string
}

export const sendTokenCode = retryHTTP(async (params: TokenConfirmation) => {
  const response = await client.post<void>(`/banking/token/${params.tokenId}`, params)
  return response.data
}, {
  maxAttempts: 3,
  backoff: () => 0,
  // backoff: (attempt) => 1000 * attempt,
  retryIf: (e) => {
    return !isUnauthorizedError(e)
  }
})
