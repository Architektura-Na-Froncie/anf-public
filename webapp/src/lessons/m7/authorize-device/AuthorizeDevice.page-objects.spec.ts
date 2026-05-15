import { AuthorizeDevicePO } from "./AuthorizeDevice.po";

import { AuthorizeDeviceProcessPrimitive } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessPrimitive";
import { AuthorizeDeviceProcessUnion } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessUnion";
import { AuthorizeDeviceProcessReduxWithStore } from "lessons/m6/authorize-device/redux/AuthorizeDeviceProcessRedux";
import { AuthorizeDeviceProcessXState } from "lessons/m6/authorize-device/xstate/AuthorizeDeviceProcessXState";


/**
 * 🔥 UWAGA!
 * 
 * Poniższy zakomentowany kod ustawiałby mocki na poziomie jest.mock (jeśli ktoś tak woli)
 * my zaś w teście bazujemy na setupie `msw`
 * Pozostawiam oba - aby móc łatwo porównać.
 * 
 * Jakby co, zostawiam linijkę z importem, ponieważ:
 * 1) TypeScript ogarnia importy - i jeśli ścieżka jest niepoprawna, to huknie.
 * 2) Ale jest.mock - z perspektywy TypeScripta - przyjmuje tylko stringa. Nie "waliduje" go.
 * Jeśli wpiszemy błędną ścieżkę do jest.mock, to TS to przepuści i wywali się dopiero test.
 * Szybkie odkomentowanie linijki z importem pomaga sprawdzić, jaką ścieżkę TS respektuje. Przydatne przy refactorach.
 */
/**
 * 🔥 UWAGA!
 *
 * Logika w mockach i logika w testach to antypattern.
 * Bo im trudniej zrozumieć, co się dzieje w teście, tym droższe jego późniejsze utrzymanie.
 * Ale tu mamy taki przypadek, że potrzebowalibyśmy do każdego testu
 * ALBO mockować poprawną odpowiedź ALBO niepoprawną - np. przy użyciu fn.mockImplementation/mockImplementationOnce
 * Można
 * Ale zrobienie _wyjątku od reguły_ (żeby mocki NIE miały logiki) jest dużo lżejsze, bo to 1 IF.
 * I w testach sterujemy już tylko długością tokena.
 * 
 * TL;DR; radykalne stosowanie się do reguł nie zawsze jest korzystne
 * Przy tak niewielkiej liczbie logiki - test nadal jest czytelny, a setup znacznie lżejszy.
 * Ale gdyby miało przybyć dodatkowej logiki w mockach - to bez przesady - prawdopodobnie poszlibyśmy w kierunku fn.mockImplementation/mockImplementationOnce
 */
// import { getTokenInstruction, sendTokenCode } from '../../../api/token'
// jest.mock('../../../api/token', () => ({
//   getTokenInstruction: async () => ({
//     instruction: "Wpisz hasło SMS",
//     tokenId: "1111-2222-3333-4444"
//   }),
//   sendTokenCode: async (params: { tokenCode: string }) => {
//     if (params.tokenCode.length !== 4){
//       throw new Error(`Invalid confirmation token!`)
//     }
//   },
// }))

/**
 * 🔥 NAJPIERW PLAN, DESIGN-FRIST. Implementacja - potem.
 * 
 * Warto najpierw spisać scenariusze, ZANIM zaczniemy pisać testy.
 * Oddzielamy fazę designu od machania łopatą :)  
 * Jeśli koncentrujemy się na designie, redukujemy ryzyko, że o czymś zapomnimy, kiedy już nas pochłoną szczegóły techniczne testu
 * 
 * Dodatkowo, plan testów możemy dać komuś do review. Wówczas reviewowany jest pomysł.
 * Koszty zmian - o ile zdecydujemy się cokolwiek zmienić - będą ZNACZNIE MNIEJSZE, niż gdybyśmy testy mieli już napisane.
 */
describe('Authorize Device Process', () => {
  it.todo('should stop the process and logout after the user clicks logout')

  describe('Allow Once', () => {
    it.todo('should succeed after the user passes the correct password')
    it.todo('should block if the user passes an invalid password')
  })
  
  describe('Add Device', () => {
    it.todo('should cancel the authorization choice if the user clicks cancel')
    it.todo('should succeed after the user passes the correct password')
    it.todo('should block if the user passes an invalid password')
  })
})

// a poniżej implementacja ;)

import { tokenMockHandlers } from 'api/mock/token.mock'
import { setupMockServer } from "api/mock/mock.server";

describe('AuthorizeDevice (Page Object)', () => {
  setupMockServer(...tokenMockHandlers)

  describe.each([
    ['Primitive', AuthorizeDeviceProcessPrimitive],
    ['Union', AuthorizeDeviceProcessUnion],
    ['Redux', AuthorizeDeviceProcessReduxWithStore],
    ['XState', AuthorizeDeviceProcessXState],
  ])('%s implementation', (name, Component) => {

  it('should stop the process and logout after the user clicks logout', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render(Component)

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickLogoutButton()

    // then
    // no view
    authorizeDevicePO.expectSuccessCallback.not.toHaveBeenCalled()
    authorizeDevicePO.expectLogoutCallback.toHaveBeenCalledTimes(1)
    // or: authorizeDevicePO.expectProcessFinished() / authorizeDevicePO.expectProcessFailed()
  });

  it('should cancel the authorization choice if the user clicks cancel on "add device"', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render(Component)

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.confirmAddDeviceName()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.clickTokenCancelButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")
  });

  it('should authorize a device successfully after the user passes the correct password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render(Component)

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.confirmAddDeviceName("mój komputerek")

    // then
    await authorizeDevicePO.expectTextDisplayed("mój komputerek")
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.submitAddDeviceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisplayed("Urządzenie zapisane jako zaufane")

    // when
    authorizeDevicePO.clickCloseButton()

    // then
    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });

  it('should block the process if the user passes an invalid password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render(Component)

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.confirmAddDeviceName()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.submitAddDeviceToken("pass too long")

    // then
    await authorizeDevicePO.expectTextDisplayed("Niepoprawny token")
    authorizeDevicePO.expectSuccessCallback.not.toHaveBeenCalled()
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });

  it('should allow once after the user passes the correct password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render(Component)

    // when
    authorizeDevicePO.clickChooseAllowOnceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki")

    // when
    authorizeDevicePO.submitAllowOnceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisappeared("Jednorazowy wjazd do apki")
    await authorizeDevicePO.expectLoaderDisappeared()
    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });

  describe('with composite page object', () => {
    it('should authorize a device successfully after the user passes the correct password', async () => {
      // given
      const authorizeDevicePO = AuthorizeDevicePO.render(Component)
  
      // when
      authorizeDevicePO.clickChooseAddDeviceButton()
  
      // then
      await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")
  
      // when
      authorizeDevicePO.confirmAddDeviceName("mój komputerek")
  
      // then
      await authorizeDevicePO.expectTextDisplayed("mój komputerek")
      await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")
  
      // when
      // 🔥 bind composite page object
      const tokenViewPO = authorizeDevicePO.getAddDeviceTokenViewPO()
      // 🔥 operate on a smaller PO
      tokenViewPO.submitAddDeviceToken("pass")
  
      // then
      await authorizeDevicePO.expectTextDisplayed("Urządzenie zapisane jako zaufane")
  
      // when
      authorizeDevicePO.clickCloseButton()
  
      // then
      authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
      authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
    });
  });

  });
});
