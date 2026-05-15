import { render } from "@testing-library/react";

import { unsafe_cast } from "lib/lang";

import { AuthorizeDevicePO } from "lessons/m7/authorize-device/AuthorizeDevice.po";
import { AuthorizeDeviceProcessMobx as AuthorizeDeviceProcess } from "./AuthorizeDeviceProcessMobx";
import { AuthorizeDeviceStore } from "./store/AuthorizeDeviceStore";

/**
 * UWAGA! 🔥
 *
 * Dlaczego dziedziczenie Page Objecta?
 * - szkoleniowo tak wygodniej
 * Poniższy Page Object renderuje komponent nieco inaczej niż oryginalny Page Object (z modułu o testowaniu integracyjnym).
 * Ten tutaj potrzebuje store MobXowy, musi go również stworzyć.
 * Moglibyśmy skopiować całość... ale różniłaby się jedynie metoda render, jak poniżej.
 * W PRAWDZIWEJ APLIKACJI nie mielibyśmy potrzeby takiego dziedziczenia, bo implementacja wystarczy jedna.
 */
export class AuthorizeDeviceMobXPO extends AuthorizeDevicePO {
  static render() {
    const onSuccess = jest.fn()
    const onLogout = jest.fn()
    const store = new AuthorizeDeviceStore()

    const { container } = render(<AuthorizeDeviceProcess
      onSuccess={onSuccess}
      onLogout={onLogout}
      store={store}
    />)

    return new AuthorizeDevicePO(unsafe_cast.ElementToHTMLElement(container), onSuccess, onLogout);
  }
}
