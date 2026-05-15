import axios from "axios";
import { BASE_URL } from "env/config";
import { Money } from "api/types";
import { TokenInstruction } from './token'

export type VerificationMethod = "SMS-CODE" | "SCRATCH-CARD-CODE"

export const changeLimitsVerificationMethodLabel: { [key in VerificationMethod] : string } = {
  "SMS-CODE": "Kod SMS",
  "SCRATCH-CARD-CODE": "Karta zdrapka",
}

export interface LimitsSettings {
  dailyLimit: Money
  availableDailyAmount: Money
  monthlyLimit: Money
  availableMonthlyAmount: Money
  verificationMethod: VerificationMethod
}

export const getLimits = async () => {
  const response = await axios.get<LimitsSettings>(`${BASE_URL}/banking/limits`);
  return response.data;
}

type SendLimitsUpdatePayload = 
  | Pick<LimitsSettings, "dailyLimit">
  | Pick<LimitsSettings, "monthlyLimit">
  | Pick<LimitsSettings, "verificationMethod">

export interface SendLimitsUpdateResponse {
  token: TokenInstruction
  settings: LimitsSettings
}

export const sendLimitsUpdate = async (payload: SendLimitsUpdatePayload) => {
  const response = await axios.post<SendLimitsUpdateResponse>(`${BASE_URL}/banking/limits`, payload);
  return response.data;
}
