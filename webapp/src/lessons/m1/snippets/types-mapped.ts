export interface Transfer {
  id: string;
  amount: number;
  title: string;
  payerAccount: string;
  beneficiaryAccount: string;
  beneficiaryAddress?: string;
  scheduledAt: string;
}

type T1 = Partial<Transfer>
type T2 = Required<Transfer>
// type T2 = Required<Partial<Transfer>>
type T3 = Pick<Transfer, "id" | "amount">
type T4 = Omit<Transfer, "id" | "amount">





type Reveal<T> = { [P in keyof T]: T[P] }
type RequiredFields<T, K extends keyof T> = Reveal<
  Required<Pick<T, K>> & Omit<T, K>
>
type X = RequiredFields<{ a?: number, b?: number }, 'a'>
