import { AxiosError } from 'axios'
import { APIError } from './error-messages';

// `unknown` because we're not guaranteed we'd get specifically errors from the backend.
// Could be a network timeout and the structure will be different.
export const isAxiosError = (e: any): e is AxiosError<unknown> => {
  return (Boolean(e.isAxiosError)) && typeof e.config == "object";
};

export const isRestError = (errorData: unknown): errorData is APIError => {
  return (typeof errorData === "object") && (!!errorData) && typeof (errorData as any).timestamp === "string" && typeof (errorData as any).status === "number";
};

export const hasErrorCode = (status: number) => (error: any) =>
  isAxiosError(error) && error.response?.status === status;

export const isServerError = (e: AxiosError) => {
  if (!e.response) {
    return false;
  }
  const status = e.response.status;
  return status >= 500;
};

export const isClientError = (e: AxiosError) => {
  if (!e.response) {
    return false;
  }
  const status = e.response.status;
  return status >= 400 && status < 500;
};

export const isUnauthorizedError = hasErrorCode(401)
export const isForbiddenError = hasErrorCode(403)
export const isInternalServerError = hasErrorCode(403)
