# Moduł 6 - Maszyny Stanowe - PRACA DOMOWA

## Design: `assertState`

- dołączasz do projektu, w którego kodzie: jedno przejście ma assertState – inne nie
- ktoś pyta Cię o rekomendację – kiedy należy stosować `assertState`?
- przykład:
```ts
const resetToken =
  async () => {
    assertState(state, "ADD_DEVICE_TOKEN")
    setState({ type: "LOADING" })
    const token = await getToken()
    setState(({
      ...state,
      ...token,
      error: false
    }))
  }
```

## Design: Authorize Device – Error

- to, co mamy do tej pory:
  ```
  {
    type: "ALLOW_ONCE_TOKEN"
    tokenId: string
    instruction: string
    error: boolean
  }
  ```
- zaproponuj, jak inaczej można przechowywać informacje o błędach
- dostosuj wybraną maszynę stanową do wybranego rozwiązania

## proces Change Limits

Należy zaimplementować proces zmiany limitów na koncie bankowym. Interfejs pozwala zmienić limit dzienny, miesięczny oraz metodę potwierdzania płatności.

- folder: `src/ui/change-limits/views/*`
- storybook: sekcja *Change Limits / Views*
- zaślepka implementacji: `src/lessons/m6/HOMEWORK-change-limits`
- zadanie: stwórz nowy plik (lub pliki) implementujące proces. Następnie osadź go w aplikacji lub storybooku.

### flow - z perspektywy użytkownika

- użytkownik wchodzi w zakładkę "limity" - tam widzi informacje o limitach na swoim koncie
- zmiana "dziennego limitu wydawania hajsu":
  - user klika "zmień"
  - formularz z limitem dziennym
  - (jeśli user klika "anuluj" - wraca do podstawowego widoku)
  - user wpisuje kwotę i klika "zmień"
  - formularz z tokenem
  - (jeśli user klika "prześlij nowy kod" - reset token), 
  - (jeśli user klika "anuluj" - wraca do podstawowego widoku)
  - user klika "potwierdź" - walidacja tokenu
- zmiana "miesięcznego limitu wydawania hajsu":
  - analogicznie, jak dzienny limit
- zmiana "metody potwierdzania płatności":
  - user klika "zmień"
  - formularz z "metodami potwierdzania" (SMS kod/kod z karty zdrapki)
  - (jeśli user klika "anuluj" - wraca do podstawowego widoku)
  - user wybiera "metodę potwierdzania" z dropdowna i klika "zmień"
  - formularz z tokenem
  - (jeśli user klika "prześlij nowy kod" - reset token), 
  - (jeśli user klika "anuluj" - wraca do podstawowego widoku)
  - user klika "potwierdź" - walidacja tokenu 

Gałęzie na zmianę limitu dziennego, miesięcznego i zmianę metody potwierdzania płatności są bardzo podobne. Różnią się pojedynczą informacją, która jest zmieniana podczas procesu.

### REST API:

- `src/api/limits.ts`
  - `GET /banking/limits`, funkcja `getLimits()` - pobiera aktualne info dot. limitów (*dzienny limit wydawania hajsu*, *dostępne hajsiwo* oraz *możliwość zmiany*)
  - `POST /banking/limits`, funkcja `sendLimitsUpdate(update)` - wysłanie zmian wprowadzonych przez użytkownika w formularzu. **Zwraca 2 rzeczy**
    - token, który potem należy potwierdzić kodem SMS
    - podsumowanie ustawień (`settings`) które "wejdą w życie" jeśli zmiana zostanie poprawnie potwierdzona kodem SMS
- `src/api/token.ts`
  - `POST /banking/token/:token-id`, funkcja `sendTokenCode(token)` - wysłanie kodu, potwierdzającego zmianę.

### flow - z perspektywy REST API

- użytkownik wchodzi w sekcję _limity_
- UI wysyła `GET /banking/limits` żeby w ogóle mieć co wyświetlać (stan obecny)
- użytkownik klika np. _zmień limit dzienny wydawania hajsu_
- UI pokazuje inputa pozwalającego zmienić ów dzienny limit
- użytkownik zmienia wartość i klika "zmień"
- UI wysyła `POST /banking/limits`, zawierające oczekiwaną zmianę. UI dostaje w zwrotce **token** - do którego użytkownik będzie musiał wpisać kod SMS - a także **podsumowanie**. UI **nie** wyświetla na tym etapie obecnych limitów, tylko te "symulowane", te które mają wejść w życie. Dzięki temu, kiedy użytkownik "potwierdza zmianę", wie, jakie będą jej konsekwencje (bo widzi je - zamiast stanu obecnego)
- UI wyświetla "podsumowanie symulowane" oraz info o tokenie SMS
- użytkownik wpisuje kod SMS, zatwierdza
- UI wysyła `POST /banking/token/:token-id`, zawierający kod SMS odpowiadający danemu tokenowi
- dalej standardowo - jeśli kod SMS poprawny - udało się - następuje ponowne wyświetlenie limitów ze zaktualizowanymi już danymi. A jeśli wysłano niepoprawny kod SMS - to wracamy do formularza z tokenem + wyświetlamy błąd.

## Własny Projekt

- Przeanalizuj kod projektu, w którym pracujesz - pod kątem występowania **antywzorca primitive obsession**.
- Czy można je spotkać w wielu miejscach?
- Jeśli masz jakieś konkretne miejsce - czy potrafisz zamodelować je w bardziej “sensowny” sposób?
