import { AxiosError } from "axios";

import * as guards from "./error-guards";
import { UserErrorMessage, getErrorMessageByHTTPStatusCode } from "./error-messages";

const getErrorMessageIfAxiosError = (e: AxiosError) => {
  if (e.response?.status) {
    return getErrorMessageByHTTPStatusCode(e.response.status);
  }
};

// kaskada IFów. Tę funkcję możemy wpiąć w try..catche w aplikacji
export const getUserErrorMessage = (e: unknown): UserErrorMessage => {
  // najpierw sprawdzamy czy rzucony został nie-error
  // (nie spodziewamy się tego, ale w JSie niestety to możliwe)
  // e: unknown
  if (!(e instanceof Error)) {
    return { type: "UNEXPECTED_ERROR" };
  }

  // potem sprawdzamy type-errory
  // czyli potencjalnie "lipa w naszym kodzie"
  // e: TypeError
  if (e instanceof TypeError) {
    return { type: "UNEXPECTED_ERROR" };
  }

  // następnie sprawdzamy wszelkie inne errory, byle NIE axios (nie HTTP)
  // e: Error
  if (!guards.isAxiosError(e)) {
    return { type: "UNEXPECTED_ERROR" };
  }

  // 🔥 widzimy, że mamy 3 IFy, które mapują na ten sam komunikat
  // 🔥 czy lepiej mieć je osobno - dla czytelności - czy połączyć - KWESTIA PREFERENCJI
  // 🔥 w naszym repo są wydzielone, aby łatwiej było śledzić, co się dzieje

  // a teraz - brak internetu
  // Axios Network Error (see https://github.com/axios/axios/issues/383)
  // thrown when Axios is unable to receive any response from the server, as a consequence both status and response are undefined
  // Od wersji 0.27.0 błąd braku sieci ma kod 'ERR_NETWORK' (https://github.com/axios/axios/pull/3645)
  if (!e.response || e.code === "ERR_NETWORK") {
    return { type: "CONNECTION_FAILURE" };
  }

  // a od tego miejsca, skoro obsłużyliśmy wszelkie "egzotyczne" błędy
  // to przechodzimy do błędów HTTP. Mamy `response`, więc MUSIELIŚMY DOSTAĆ ODPOWIEDŹ
  // no i teraz - w taki albo śmaki sposób - mapujemy statusy HTTP na konkretne komunikaty
  // poniższy kod to tylko przykład, można go zamodelować na wiele sposobów

  // AxiosError, use HTTP Status Code map
  const messageType = getErrorMessageIfAxiosError(e);
  // const messageType = getErrorMessageByHTTPStatusCode(parseInt(e.code))
  if (messageType) {
    return { type: messageType };
  }

  // Axios Error 5xx
  if (guards.isServerError(e)) {
    return { type: "SYSTEM_FAILURE" };
  }

  return { type: "UNEXPECTED_ERROR" };
}
