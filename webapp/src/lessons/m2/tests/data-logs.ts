import { logs } from "./data-logs.json";

export type Log = {
  id: string;
  date: string;
  level: string;
  account: string;
  content: string;
}

export { logs }
