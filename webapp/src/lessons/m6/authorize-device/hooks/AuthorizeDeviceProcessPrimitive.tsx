import React, { useState } from "react"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { getTokenInstruction, sendTokenCode } from 'api/token'

import { Loader } from "ui/atoms"

interface AuthorizeDeviceProcessPrimitiveProps {
  onSuccess: () => void
  onLogout: () => void
}

/**
 * spójrzmy krytycznie na AuthorizeDeviceState poniżej
 * 🔥 🤔 💣
 * jeśli mamy osobno jedną zmienną stringową, która ma "CHOOSE_METHOD" | "ALLOW_ONCE_TOKEN" | "ADD_DEVICE_FORM" etc.
 * i osobno całą resztę (tuzin useState niżej w komponencie) to wszystko jest porozklejane.
 * "DA SIĘ" to zakodować poprawnie w tym podejściu, ale kod będzie bardziej chaotyczny, będzie mnóstwo miejsc, gdzie można się pomylić
 * i współczujemy osobom, które kod napisany w takim stylu będą utrzymywały.
 * 
 * 🔥 WAŻNE: poniższa implementacja Primitive to ANTYPATTERN 🔥
 */
type AuthorizeDeviceState =
  | "CHOOSE_METHOD"
  | "LOGGED_OUT"
  | "ALLOW_ONCE_TOKEN"
  | "ALLOW_ONCE_SUCCESS"
  | "ADD_DEVICE_FORM"
  | "ADD_DEVICE_TOKEN"
  | "ADD_DEVICE_CONFIRMATION"
  | "ADD_DEVICE_SUCCESS"

export const AuthorizeDeviceProcessPrimitive = (props: AuthorizeDeviceProcessPrimitiveProps) => {
  const { onSuccess, onLogout } = props
  const [stateType, setStateType] = useState<AuthorizeDeviceState>("CHOOSE_METHOD")

  // 🔥 pusty string trochę bez sensu, bo np. w "allow once" w ogóle nigdy nie będzie istniał, ale jak zlikwiduję stringa, to inne komponenty wybuchną.
  // Skąd problem? Bo "spłaszczając" wszystkie elementy stanu i wrzucając do jednego wora TS nie ma szansy widzieć, że w kroku 1 nie znamy device, ale w 3 już na pewno, więc jest gwarantowane. Mając worek typów prymitywnych tracimy type safety.
  const [deviceName, setDeviceName] = useState<string>('')

  // 🔥 pusty string trochę bez sensu
  // ale jego brak (pamiętajmy - `useState<string>()` - rozszerza typ do "string | undefined") - również kiepski,
  // bo jak instruction (string) będzie potrzebne, czego TS nie gwarantuje, to trzeba haczyć (np. `instruction!`)
  // generalnie jak nie spojrzeć "d" z tyłu, bo inicjalnie (na początku procesu) instruction nie ma prawa istnieć i szukanie domyślnej wartości _w tym momencie_ nie ma sensu
  // alternatywa (implementacje: Union, Redux, XState) bazują na tym, że instruction (i inne komórki) istnieją tylko wtedy, kiedy mają sens - a gdyby miały nie mieć sensu, to są niszczone + kompilator to śledzi
  const [instruction, setInstruction] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()

  // 🔥 error oraz loading jako osobne komórki zwiększają ryzyko pomyłki polegającej na stworzeniu niepoprawnego stanu (np. loading:true & error:true)
  const [isLoading, setLoading] = useState(false)
  // 🔥 dodatkowo, error: boolean jest mało precyzyjny. Być może jakiś kawałek UI potrzebowałby wyświetlić np. szczegóły błędu?
  const [error, setError] = useState(false)

  const cancelChoice = () => {
    setStateType("CHOOSE_METHOD")
  }

  const chooseAllowOnce = async () => {
    setLoading(true)
    setStateType("ALLOW_ONCE_TOKEN")
    // 🤔 await zdecudowanie potrzebuje try..catcha. I co mu ustawić - komórkę error:true? Wówczas error:true na ekranie z inputem oznacza błędnie wpisany przez użytkownika kod, zaś na innych ekranach oznacza że np. API zdechło - a na jeszcze innych ekranach jeszcze co innego?
    // Zasadniczo, 1 komórka pamięci która reprezentuje zupełnie różne rzeczy (różne rodzaje błędów o różnych przyczynach) to kiepski pomysł, bo będzie trudno zrozumieć znaczenie/cel tej komórki pamięci, utrzymując kod.
    const tokenInstruction = await getTokenInstruction()
    setTokenId(tokenInstruction.tokenId)
    setInstruction(tokenInstruction.instruction)
    setLoading(false)
  }

  const submitAllowOnce = async (password: string) => {
    setLoading(true)
    try {
      await sendTokenCode({ tokenId: tokenId!, tokenCode: password })
      setStateType("ALLOW_ONCE_SUCCESS")
      onSuccess()
    } catch (e: unknown) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const chooseAddDevice = () => {
    setStateType("ADD_DEVICE_FORM")
  }

  const submitDeviceName = async (currentDeviceName: string) => {
    setLoading(true)
    setDeviceName(currentDeviceName)
    // 🤔 await zdecudowanie potrzebuje try..catcha. I co mu ustawić - komórkę error:true? Wówczas error:true na ekranie z inputem oznacza błędnie wpisany przez użytkownika kod, zaś na innych ekranach oznacza że np. API zdechło - a na jeszcze innych ekranach jeszcze co innego?
    // Zasadniczo, 1 komórka pamięci która reprezentuje zupełnie różne rzeczy (różne rodzaje błędów o różnych przyczynach) to kiepski pomysł, bo będzie trudno zrozumieć znaczenie/cel tej komórki pamięci, utrzymując kod.
    const tokenInstruction = await getTokenInstruction()
    setTokenId(tokenInstruction.tokenId)
    setInstruction(tokenInstruction.instruction)
    setStateType("ADD_DEVICE_TOKEN")
    setLoading(false)
  }

  const resetToken = async () => {
    setLoading(true)
    const tokenInstruction = await getTokenInstruction()
    setTokenId(tokenInstruction.tokenId)
    setInstruction(tokenInstruction.instruction)
    setLoading(false)
    setError(false)
  }

  const submitAddDevice = async (password: string) => {
    setLoading(true)
    try {
      await sendTokenCode({ tokenId: tokenId!, tokenCode: password })
      setStateType("ADD_DEVICE_CONFIRMATION")
    } catch (e: unknown) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 😏 cała implementacja "PRIMITIVE OBSESSION" jest tak źle zamodelowana, że równie dobrze można by się pozbyć stanów finalnych (PS pamiętajmy, ten plik to antypattern)
   */
  const handleLogout = () => {
    setStateType("LOGGED_OUT")
    onLogout()
  }

  const confirmDeviceAdded = () => {
    setStateType("ADD_DEVICE_SUCCESS")
    onSuccess()
  }

  if (isLoading){
    return <Loader />
  }

  switch(stateType){
    case "CHOOSE_METHOD":
      return <AuthorizeDeviceChooseMethodView
        onAddDeviceToTrusted={chooseAddDevice}
        onAllowDeviceOnce={chooseAllowOnce}
        onLogout={handleLogout}
      />

    case "ALLOW_ONCE_TOKEN":
      return <AuthorizeDeviceAllowOnceTokenView
        onSubmit={submitAllowOnce}
        onCancel={cancelChoice}
        instruction={instruction!} // 😳 oh no! `instruction` nie jest gwarantowane (bo jest typu `string | undefined`, a wymagane string). Ale że my wiemy, że w stanie `ADD_DEVICE_TOKEN` instruction powinno istnieć 😏 to wyciszamy błąd TSa... ale krzywo! (PS pamiętajmy - cały ten plik to antypattern)
        error={error}
      />

    case "ALLOW_ONCE_SUCCESS":
      return null

    case "ADD_DEVICE_FORM":
      return <AuthorizeDeviceAddDeviceFormView
        onSubmit={submitDeviceName}
      />

    case "ADD_DEVICE_TOKEN":
      return <AuthorizeDeviceAddDeviceTokenView
        deviceName={deviceName}
        instruction={instruction!} // 😳 analogicznie jak powyżej
        onSubmit={submitAddDevice}
        onReset={resetToken}
        onCancel={cancelChoice}
        error={error}
      />

    case "ADD_DEVICE_CONFIRMATION":
      return <AuthorizeDeviceAddDeviceConfirmationView
        deviceName={deviceName}
        onClose={confirmDeviceAdded}
      />

    case "ADD_DEVICE_SUCCESS":
      return null

    case "LOGGED_OUT":
      return null

    default:
      const leftover: never = stateType
      return null
  }
}
