import axios from 'axios';

import { BASE_URL } from 'env/config';

export type LogLevel = "INFO" | "DEBUG" | "ERROR" | "WARN";

export const sendLog = async (level: LogLevel, content: string, data: any) => {
  const response = await axios.post<void>(`${BASE_URL}/logs`, { level, content, /* data*/ account: "ACCOUNT" })
  return response.data
}
