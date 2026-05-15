# Moduł 6 - Maszyny Stanowe

## opis

W tym module uczymy się o maszynach stanowych, które umożliwiają obsługę zaawansowanych procesów, przez które przechodzi użytkownik. Realizujemy kilka alternatywnych implementacji, analizując ich zalety i wady.

## Pliki wg lekcji

- Procesy Wielokrokowe i Diagramy Stanów
  - `AuthorizeDevice.stories.tsx` (SB)
  - poszczególne ekrany procesu: `ui/authorize-device/views/*`
- Primitive Obsession
  - `authorize-device/hooks/AuthorizeDeviceProcessPrimitive.tsx`
- Union State Machine
  - `authorize-device/types.ts`
  - `authorize-device/hooks/AuthorizeDeviceProcessUnion.tsx`
  - `state-members.ts` (TS-owa funkcja `assertState`)
- Redux State Machine
  - `authorize-device/hooks/AuthorizeDeviceProcessRedux.tsx`
  - testy
- XState Machine
  - po kolei `visualiser-*`
  - `authorize-device/hooks/AuthorizeDeviceProcessXState.tsx`
  - testy

----

## proces Authorize Device

- wszystkie **widoki** są dostępne w storybooku w sekcji "AUTHORIZE DEVICE / Views"
- storybookowa sekcja "LESSONS / M6 State Machines / Authorize Device" zawiera implementacje całego procesu, które wykorzystują powyższe widoki
- funkcjonalność luźno oparta o unijną dyrektywę [PSD2](https://pl.wikipedia.org/wiki/Payment_Services_Directive#Poprawiona_dyrektywa_w_sprawie_us%C5%82ug_p%C5%82atniczych_(PSD2))

#### callbacki

- `onSuccess(): void` - jeśli autoryzacja się powiedzie - bez względu na metodę - uruchamiany jest ten callback. Może to być redirect, może być zmiana jakiegoś stanu, cokolwiek.
- `onLogout(): void` - jeśli użytkownik kliknie *"wyloguj"*, uruchamiany jest ten callback.

Uwaga: zwrómy uwagę, że mamy osobno *"anuluj"* oraz *"wyloguj"*:
- *"anuluj"* - będąc w stanie `ADD_DEVICE_TOKEN` - przenosi użytkownika z powrotem do menu wyboru (stan początkowy) 
- *"wyloguj"* - będąc w stanie `ALLOW_ONCE_TOKEN` - proces się kończy od razu - i jest wołany callback `onLogout`.

#### stany

- `CHOOSE_METHOD` - stan początkowy. Użytkownik albo wybiera *"zapisz to urządzenie do zaufanych"* (-> `ADD_DEVICE_FORM`) albo *"jednorazowy wjazd do apki"* (-> `ALLOW_ONCE_TOKEN`, tu jest call do API po token)
- `ALLOW_ONCE_TOKEN` - w tym stanie mamy już tokenId (pobrany asynchronicznie podczas przejścia) i użytkownik musi wpisać kod do inputa. Jeśli kliknie *"zaniechaj"* (-> `CHOOSE_METHOD`) to wracamy do poprzedniego ekranu z polem wyboru. A jeśli kliknie *"potwierdź"*, to próbujemy użytkownika zautoryzować wg kodu. Jeśli się uda, to przechodzimy do `ALLOW_ONCE_SUCCESS`, a jeśli kod był błędny, to wracamy na `ALLOW_ONCE_TOKEN`, ale podświetlamy błąd.
- `ALLOW_ONCE_SUCCESS` - stan finalny, który nie ma swojego widoku. Wejście w niego odpala callback `onSuccess`.
- `ADD_DEVICE_FORM` - tutaj użytkownik musi podać nazwę urządzenia, które chce zapisać do zaufanych. Następnie klika checkbox, że zgadza się na wszystko. Potem jak klika *"zapisz urządzenie jako zaufane"*, to rozpoczynamy autoryzację (-> `ADD_DEVICE_TOKEN`, tu jest call do API po token)
- `ADD_DEVICE_TOKEN` - w tym stanie mamy już tokenId (pobrany asynchronicznie podczas przejścia) i użytkownik musi wpisać kod. Jeśli użytkownik kliknie *"zaniechaj"* to wraca do menu wyboru (-> `CHOOSE_METHOD`, analogicznie jak _zaniechaj_ kliknięte na `ALLOW_ONCE_TOKEN`). Jeśli kliknie *"wyślij ponownie kod"*, to pod spodem wykonujemy do API call o nowy token, i jak go dostaniemy, to wracamy na tę samą stronę (-> `ADD_DEVICE_TOKEN`). Natomiast jeśli kliknie *"potwierdź"*, to próbujemy użytkownika zautoryzować wg kodu. Jeśli się uda, to przechodzimy do `ADD_DEVICE_SUCCESS`. A jeśli kod był błędny, to wracamy na `ADD_DEVICE_TOKEN` ale podświetlamy błąd.
- `ADD_DEVICE_CONFIRMATION` - ekran, na którym użytkownik widzi systemowe potwierdzenie, że udało się zautoryzować urządzenie. Użytkownik ma teraz kliknąć *"wjeżdżam w apkę"*, aby potwierdzić, że przyjął ów fakt do wiadomości.
- `ADD_DEVICE_SUCCESS` - stan finalny, który nie ma swojego widoku. Wejście w niego odpala callback `onSuccess` (podobnie jak `ALLOW_ONCE_SUCCESS`).
