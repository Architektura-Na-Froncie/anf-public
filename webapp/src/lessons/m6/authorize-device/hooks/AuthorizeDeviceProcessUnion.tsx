import React, { useState } from "react"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { AuthorizeDeviceState } from "lessons/m6/authorize-device/types"
import { getTokenInstruction, sendTokenCode } from 'api/token'

import { Loader } from "ui/atoms"
import { assertState } from "../../state-members"

interface AuthorizeDeviceProcessUnionProps {
  onSuccess: () => void
  onLogout: () => void
}

export const AuthorizeDeviceProcessUnion = (props: AuthorizeDeviceProcessUnionProps) => {
  const { onSuccess, onLogout } = props

  /**
   * 🤔 czy loading jako osobna komórka stanu to dobry pomysł?
   * Gdyby to była osobna komórka, to technicznie możliwe jest ustawienie np. loading=false & state.type="SOMETHING" - i wiadomo jakie będą konsekwencje. Byłby powrót do primitive obsession, czego nie chcemy
   * Zasadniczo, "loading" to stan naszej maszyny stanowej. Więc likwidujemy osobną komórkę na loading, tj. pozbywamy się tego:
   *    const [isLoading, setLoading] = useState(false)
   */

  const [state, setState] = useState<AuthorizeDeviceState>({
    type: "CHOOSE_METHOD"
  })

  const cancelChoice = async () => {
    setState({ type: "CHOOSE_METHOD" })
  }

  const chooseAllowOnce = async () => {
    setState({ type: "LOADING" })
    // 🤔 tu też potrzebny jest try..catch. Wprawdzie nie mamy osobnego ekranu, bo użytkownik _jeszcze_ nie wpisał nic do inputa - ale może być błąd techniczny (np. zawiśnie API).
    // Będziemy to omawiali w module "Obsługa błędów"
    const tokenInstruction = await getTokenInstruction()
    setState({
      type: "ALLOW_ONCE_TOKEN",
      ...tokenInstruction,
      error: false,
    })
  }

  const submitAllowOnce = async (password: string) => {
    if (state.type !== "ALLOW_ONCE_TOKEN"){
      throw new Error(`Invalid State: ${state}`)
    }

    setState({ type: "LOADING" })
    try {
      // 🤔 wprawdzie zmieniamy stan po drodze (loading powyżej) ale stan sprzed zmiany został "domknięty" (closure trzyma go w zmiennej `state`)
      // więc state.tokenId ma poprawną wartość. ALE jeśli nie lubimy "stale closures" które podnoszą poziom trudności - możemy zdestrukturyzować stan i użyć prostej zmiennej dla tokena
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      setState({ type: "ALLOW_ONCE_SUCCESS" })
      onSuccess()
    } catch (e: unknown) {
      setState({ ...state, error: true })
    }
  }

  const chooseAddDevice = async () => {
    setState({
      type: "ADD_DEVICE_FORM"
    })
  }

  const submitDeviceName = async (currentDeviceName: string) => {
    setState({ type: "LOADING" })
    // 🤔 tu też potrzebny jest try..catch. Wprawdzie nie mamy osobnego ekranu, bo użytkownik _jeszcze_ nie wpisał nic do inputa - ale może być błąd techniczny (np. zawiśnie API).
    // Będziemy to omawiali w module "Obsługa błędów"
    const tokenInstruction = await getTokenInstruction()
    setState({
      type: "ADD_DEVICE_TOKEN",
      deviceName: currentDeviceName,
      ...tokenInstruction,
      error: false,
    })
  }

  const resetToken = async () => {
    assertState(state, "ADD_DEVICE_TOKEN")
    setState({ type: "LOADING" })
    const tokenInstruction = await getTokenInstruction()
    setState(({ ...state, ...tokenInstruction, error: false }))
  }

  const submitAddDevice = async (password: string) => {
    // upewnijmy się, że jesteśmy w odpowiednim stanie, aby TS "pozwolił" nam wejść w odpowiednie pola stanu
    // ręcznie:
    if (state.type !== "ADD_DEVICE_TOKEN"){
      throw new Error(`Invalid State: ${state}`)
    }
    // bardziej zwięźle:
    assertState<AuthorizeDeviceState['type']>(state, "ADD_DEVICE_TOKEN")

    setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      setState({
        type: "ADD_DEVICE_CONFIRMATION",
        deviceName: state.deviceName
      })
    } catch (e: unknown) {
      setState(({ ...state, error: true }))
    }
  }

  // 🔥 dla stanu finalnego - wybieramy 1 z rozwiązań:
  // - albo używamy stanu LOGGED_OUT i zmiana stanu jest zsynchronizowana z callbackiem - plusem jest to że stan w pamięci zawsze odzwsierciedla "stan faktyczny" i łatwiej rozumieć implementację/debugować
  const handleLogout = () => {
    setState({ type: "LOGGED_OUT" })
    onLogout()
  }
  // - albo używamy stanu LOGGED_OUT i callback onLogout jest _REAKCJĄ_ na zmianę stanu (reactive) - plusem jest to że stan steruje wszystkim, nic się nie dzieje " z boku"
  // useEffect(() => {
  //   if (state.type === "LOGGED_OUT"){
  //     onLogout()
  //   }
  // }, [state, onLogout])
  // - albo w ogóle likwidujemy stan LOGGED_OUT - mamy mniej stanów, ale część logiki jest state-unaware i potencjalnie trudniej może być rozumieć implementację/debugować
  // const handleLogout = onLogout // lub w ogóle używamy onLogout z propsa bezpośrednio, bez znaczenia
  // 🔥 nie istnieje jedno "idealne" podejście ( ͡° ͜ʖ ͡°) i w zależności od przypadku (większy/mniejszy proces, bardziej/mniej skomplikowany, dużo/mało danych, są dodatkowe side effecty lub nie ma, etc) będziemy preferowali inne podejścia

  const handleSuccess = () => {
    setState({ type: "ADD_DEVICE_SUCCESS" })
    onSuccess()
  }
  // analogicznie jak handleLogout

switch(state.type){
  case "LOADING":
    return <Loader />

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
      instruction={state.instruction}
      error={state.error}
    />

  case "ALLOW_ONCE_SUCCESS":
    return null

  case "ADD_DEVICE_FORM":
    return <AuthorizeDeviceAddDeviceFormView
      onSubmit={submitDeviceName}
    />

  case "ADD_DEVICE_TOKEN":
    return <AuthorizeDeviceAddDeviceTokenView
      deviceName={state.deviceName}
      instruction={state.instruction}
      onSubmit={submitAddDevice}
      onReset={resetToken}
      onCancel={cancelChoice}
      error={state.error}
    />

  case "ADD_DEVICE_CONFIRMATION":
    return <AuthorizeDeviceAddDeviceConfirmationView
      deviceName={state.deviceName}
      onClose={handleSuccess}
    />

  case "ADD_DEVICE_SUCCESS":
    return null

  case "LOGGED_OUT":
    return null

  default:
    const leftover: never = state
    return null
  }
}
