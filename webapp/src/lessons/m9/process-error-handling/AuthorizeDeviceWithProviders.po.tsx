import { render } from "@testing-library/react";

import { unsafe_cast } from "lib/lang";

import { AuthorizeDevicePO } from "lessons/m7/authorize-device/AuthorizeDevice.po";
import { AuthorizeDeviceWithErrorHandling } from "./AuthorizeDeviceWithErrorHandling";

import { ErrorScreenProvider } from "../error-ui/ErrorScreenContext";
import { LoggerProvider } from "../logger";
import { MockLogger } from "../logger/Logger.mock";

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
export class AuthorizeDeviceWithProvidersPO extends AuthorizeDevicePO {
  static renderWithProviders(mockLogger: MockLogger) {
    const onSuccess = jest.fn()
    const onLogout = jest.fn()

    const { container } = render(<LoggerProvider logger={mockLogger}>
      <ErrorScreenProvider>
        <AuthorizeDeviceWithErrorHandling
          onSuccess={onSuccess}
          onLogout={onLogout}
        />
      </ErrorScreenProvider>
    </LoggerProvider>)

    return new AuthorizeDevicePO(unsafe_cast.ElementToHTMLElement(container), onSuccess, onLogout);
  }
}
