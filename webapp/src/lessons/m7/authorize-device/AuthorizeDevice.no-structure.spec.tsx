import { fireEvent, render, waitFor } from "@testing-library/react";

import { AuthorizeDeviceProcessPrimitive } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessPrimitive";
import { AuthorizeDeviceProcessUnion } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessUnion";

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

import { tokenMockHandlers } from 'api/mock/token.mock'
import { setupMockServer } from "api/mock/mock.server";

describe.each([
  // ['primitive implementation', AuthorizeDeviceProcessPrimitive],
  ['union implementation', AuthorizeDeviceProcessUnion],
])('AuthorizeDevice (%s)', (testcase, AuthorizeDeviceProcess) => {
  setupMockServer(...tokenMockHandlers)

  const renderRoot = () => {
    const onSuccess = jest.fn()
    const onLogout = jest.fn()
    const handler = render(<AuthorizeDeviceProcess
      onSuccess={onSuccess}
      onLogout={onLogout}
    />)

    return { onSuccess, onLogout, handler }
  }

  it('should stop the process and logout after the user clicks logout', async () => {
    // given
    const { onSuccess, onLogout, handler: { getByTestId, findByText } } = renderRoot()

    // then
    await findByText("Nieznane urządzenie")

    // when
    const btnLogout = getByTestId("btn-choose-logout")
    fireEvent.click(btnLogout)

    // then
    // no view
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onLogout).toHaveBeenCalledTimes(1)
  });

  it('should cancel the authorization choice if the user clicks cancel on "add device"', async () => {
    // given
    const { onSuccess, onLogout, handler: { getByTestId, findByText } } = renderRoot()

    // when
    const btnChooseAddDevice = getByTestId("btn-choose-add-device")
    fireEvent.click(btnChooseAddDevice)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")

    // when
    const checkboxAddDeviceConfirmation = getByTestId("checkbox-add-device-confirmation")
    fireEvent.click(checkboxAddDeviceConfirmation)
    const btnAddDeviceNameSubmit = getByTestId("btn-add-device-name-submit")
    fireEvent.click(btnAddDeviceNameSubmit)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")
    
    // when
    const btnTokenCancel = getByTestId("btn-token-cancel")
    fireEvent.click(btnTokenCancel)
    
    // then
    await findByText("Nieznane urządzenie")
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onLogout).not.toHaveBeenCalled()
  });

  it('should authorize a device successfully after the user passes the correct password', async () => {
    // given
    const { onSuccess, onLogout, handler: { getByTestId, findByText, container } } = renderRoot()

    // when
    const btnChooseAddDevice = getByTestId("btn-choose-add-device")
    fireEvent.click(btnChooseAddDevice)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")

    // when
    const checkboxAddDeviceConfirmation = getByTestId("checkbox-add-device-confirmation")
    fireEvent.click(checkboxAddDeviceConfirmation)
    const btnAddDeviceNameSubmit = getByTestId("btn-add-device-name-submit")
    fireEvent.click(btnAddDeviceNameSubmit)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")

    // when
    const inputEl = getByTestId("input-add-device-password") as HTMLInputElement
    fireEvent.change(inputEl, { target: { value: "pass" } })
    const btnTokenSubmit = getByTestId("btn-token-submit")
    fireEvent.click(btnTokenSubmit)

    // then
    await findByText("Urządzenie zapisane jako zaufane")

    // when
    const btnClose = getByTestId("btn-close")
    fireEvent.click(btnClose)

    // then
    await waitFor(() => { // await text disappears after clicked
      expect(container).not.toHaveTextContent("Pomyślnie zautoryzowano urządzenie")
    })
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onLogout).not.toHaveBeenCalled()
  });

  it('should block the process if the user passes an invalid password', async () => {
    // given
    const { onSuccess, onLogout, handler: { getByTestId, findByText } } = renderRoot()

    // when
    const btnChooseAddDevice = getByTestId("btn-choose-add-device")
    fireEvent.click(btnChooseAddDevice)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")

    // when
    const checkboxAddDeviceConfirmation = getByTestId("checkbox-add-device-confirmation")
    fireEvent.click(checkboxAddDeviceConfirmation)
    const btnAddDeviceNameSubmit = getByTestId("btn-add-device-name-submit")
    fireEvent.click(btnAddDeviceNameSubmit)

    // then
    await findByText("Zapisz to urządzenie jako zaufane")

    // when
    const inputEl = getByTestId("input-add-device-password") as HTMLInputElement
    fireEvent.change(inputEl, { target: { value: "too long pass" } })
    const btnTokenSubmit = getByTestId("btn-token-submit")
    fireEvent.click(btnTokenSubmit)

    // then
    await findByText("Niepoprawny token")
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onLogout).not.toHaveBeenCalled()
  });

  it('should allow once after the user passes the correct password', async () => {
    // given
    const { onSuccess, onLogout, handler: { getByTestId, findByText, queryByTestId, container } } = renderRoot()

    // when
    const btnChooseAllowOnce = getByTestId("btn-choose-allow-once")
    fireEvent.click(btnChooseAllowOnce)

    // then
    await findByText("Jednorazowy wjazd do apki")

    // when
    const inputEl = getByTestId("input-allow-once-password") as HTMLInputElement
    fireEvent.change(inputEl, { target: { value: "pass" } })
    const btnTokenSubmit = getByTestId("btn-token-submit")
    fireEvent.click(btnTokenSubmit)

    // then
    await waitFor(() => { // await text disappears after clicked
      expect(container).not.toHaveTextContent("Pomyślnie zautoryzowano urządzenie")
    })

    // then
    await waitFor(() => { // await loader disappears
      expect(queryByTestId('img-loader')).not.toBeInTheDocument()
    })

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onLogout).not.toHaveBeenCalled()
  });
});
