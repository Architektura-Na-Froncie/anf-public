import React, { useEffect } from 'react';
import { reaction } from "mobx"
import { observer } from "mobx-react-lite"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { AuthorizeDeviceStore } from './store/AuthorizeDeviceStore';
import { Loader } from 'ui/atoms';

interface AuthorizeDeviceProcessMobxProps {
  onSuccess: () => void
  onLogout: () => void
  store: AuthorizeDeviceStore
}

export const AuthorizeDeviceProcessMobx = observer<AuthorizeDeviceProcessMobxProps>(
  props => {
    const { store, onSuccess, onLogout } = props

    // 🔥 reaction jest "odmianą" autoruna, która uruchamiana jest tylko dla (ZMIENIONEGO) kawałka stanu
    // i na tym kawałku jest potem uruchamiany side effect
    useEffect(() => { // 🔥 reaktywność WIDOKU
      return reaction( // 🔥 reaktywność STANU
        () => store.state,
        (state) => {
          if (state.type === 'ALLOW_ONCE_SUCCESS'){
            onSuccess()
          }
        }
      )
    }, [store, onSuccess])

    switch(store.state.type){
      case "LOADING":
        return <Loader />

      case "CHOOSE_METHOD":
        return <AuthorizeDeviceChooseMethodView
          onAddDeviceToTrusted={store.chooseAddDevice}
          onAllowDeviceOnce={store.chooseAllowOnce}
          onLogout={onLogout}
        />

      /**
       * 🔥 UWAGA!
       * Lepiej dla szeroko pojętej wydajności byłoby przekazywać w dół do komponentów
       * NIE KONKRETNE WARTOŚCI (np. store.state.instruction) a referencję na całęgo store'a (patrz: slajd "MobX & React - dobre praktyki")
       * My tutaj robimy wyjątek tylko "szkoleniowo" - chcemy pozostać przy 1 implementacji widoków (które są state-agnostic), i które możemy reużyć w wielu implementacjach (primitive obsession, state union, redux, xstate, mobx...)
       * Innymi słowy, naszym celem jest mieć 5 rozwiązań dla procesu + 5 komponentów-widoków (reużywalnych, dla czytelności) ZAMIAST 5 rozwiązań + 25 komponentów-widoków
       * 
       * Czyli w projekcie (nie-szkoleniowym) dalibyśmy:
       * <AuthorizeDeviceAllowOnceTokenView store={store} /> - jeśli przekazujemy store'a przez propsy
       * lub
       * <AuthorizeDeviceAllowOnceTokenView /> - jeśli store ciągniemy przez Context API
       */
       case "ALLOW_ONCE_TOKEN":
        return <AuthorizeDeviceAllowOnceTokenView
          onSubmit={store.submitAllowOnce}
          onCancel={store.cancelChoice}
          instruction={store.state.instruction}
          error={store.state.error}
        />

      case "ALLOW_ONCE_SUCCESS":
        return null

      case "ADD_DEVICE_FORM":
        return <AuthorizeDeviceAddDeviceFormView
          onSubmit={store.submitDeviceName}
        />

      case "ADD_DEVICE_TOKEN":
        return <AuthorizeDeviceAddDeviceTokenView
          deviceName={store.state.deviceName}
          instruction={store.state.instruction}
          onSubmit={store.submitAddDevice}
          onReset={store.resetToken}
          onCancel={store.cancelChoice}
          error={store.state.error}
        />

      case "ADD_DEVICE_CONFIRMATION":
        return <AuthorizeDeviceAddDeviceConfirmationView
          deviceName={store.state.deviceName}
          onClose={onSuccess}
        />

      case "ADD_DEVICE_SUCCESS":
        return null

      case "LOGGED_OUT":
        return null

      default:
        const leftover: never = store.state
        return null
      }
  })
