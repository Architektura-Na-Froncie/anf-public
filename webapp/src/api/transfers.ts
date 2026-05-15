import axios from 'axios'
import { BASE_URL } from "env/config"
import { Money } from './types'

export interface Transfer {
  id: string;
  amount: Money;
  title: string;
  payerAccount: string;
  beneficiaryAccount: string;
  beneficiaryAddress: string;
  scheduledAt: string;
}

export const getTransfers = async () => {
  const response = await axios.get<Transfer[]>(`${BASE_URL}/account/transfers`)
  return response.data
}
