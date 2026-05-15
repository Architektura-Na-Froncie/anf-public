// słownik komunikatów błędów
// wszystkie komunikaty, wyświetlane użytkownikom, są spisane tutaj
export const errorMessagesMap = {
  UNEXPECTED_ERROR: "Unexpected error occurred. Please contact Support.",
  CONNECTION_FAILURE: "Internet connection error. Check your wires!",
  PAID_CONTENT: "This content is paid. You have to upgrade to access it.",
  FORBIDDEN: "Access to this resource is forbidden.",
  NOT_FOUND: "Broken link. The page you're trying to access doesn't exist.",
  TIMEOUT: "This resource is no longer available.",
  SYSTEM_FAILURE: "Something is wrong, but we're working on it!",
}

// KOMUNIKAT BŁĘDU jako taki - dostaje swój typ
// w razie potrzeby w przyszłości można go rozszerzać
export interface UserErrorMessage {
  type: keyof typeof errorMessagesMap
}

// alternatywnie, po taniości można by dać:
// export type UserErrorMessage = string

//////////////////////////////////////////

// jeśli nasze API, kiedy rzuca błędami typu 401, 403, 500 etc. dodaje payload
// to - siłą rzeczy - powinno to mieć swój typ
// nie wszystkie API dodają payload do błędu, ale niektóre tak ;)
export interface APIError {
  id: string
  code: string
  message: string
}

//////////////////////////////////////////

// poniższy kodzik mapuje statusy błędów HTTP na konkretne komunikaty
// ta funkcja jest wykorzystywana wewn. getUserErrorMessage
// i robi mniej więcej tyle, że jeśli leci błąd 403, to dla niego bierzemy komunikat "FORBIDDEN"
// a "FORBIDDEN" jest zdefiniowany w słowniku na górze

// znowu - w zależności od wymagań - niektóre systemy będą wyświetlały konkretne komunikaty błędów w zależności od statusu HTTP - a inne nie
// my tutaj to obsługujemy.
// w efekcie, jeśli gdziekolwiek w aplikacji poleci np. 403 i używamy `getUserErrorMessage`, to poleci ten sam komunikat.
// ale JEŚLI tego apka NIE POTRZEBUJE - to nie ma sensu robić NADMIAROWEGO kodu

export const getErrorMessage = (errMessage: UserErrorMessage) =>
  errorMessagesMap[errMessage.type]

export const HTTPStatusCodeToErrorMessageMap: {
  [code in number]?: keyof typeof errorMessagesMap;
} = {
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  410: "TIMEOUT",
};

export const getErrorMessageByHTTPStatusCode = (statusCode: number) => {
  const result = HTTPStatusCodeToErrorMessageMap[statusCode];
  return result;
};
