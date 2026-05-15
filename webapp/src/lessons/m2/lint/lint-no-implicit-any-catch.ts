// 🔥 Od wersji 4.4 TypeScript w strict-mode automatycznie typuje wartość rzuconą
// w klauzuli catch jako unknown. Bardziej granularną kontrolę nad tym daje flaga
// useUnknownInCatchVariables
// Więcej informacji tutaj: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables

import axios, { AxiosError } from "axios"

declare const handle: Function
function handleAxiosError(e: AxiosError) {
  handle(e.config, e.response)
}

export const isAxiosError = (e: any): e is AxiosError<unknown> => {
  return (e.isAxiosError as boolean)
};

export async function asyncCall(){
  try {
    const response = await axios.get<object[]>('api.com/data')
    return response.data.length
  } catch (e) {
    handleAxiosError(e)
  }
}
