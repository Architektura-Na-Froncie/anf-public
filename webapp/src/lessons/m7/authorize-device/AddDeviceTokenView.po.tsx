import { findByText, fireEvent, getByTestId, queryByTestId, render, waitFor } from "@testing-library/react";

import { unsafe_cast } from "lib/lang";
import { AuthorizeDeviceAddDeviceTokenView } from "ui/authorize-device/views";

class AddDeviceTokenViewPO {
  private elements: {
    tokenCancelButton: HTMLElement;
    tokenSubmitButton: HTMLElement;
    tokenResetButton: HTMLElement;
    addDevicePasswordInput: HTMLInputElement;
  };

  protected constructor(
    protected container: HTMLElement,
  ){
    this.elements = {
      get tokenCancelButton(){
        return getByTestId(container, "btn-token-cancel")
      },
      get tokenSubmitButton(){
        return getByTestId(container, "btn-token-submit")
      },
      get tokenResetButton(){
        return getByTestId(container, "btn-token-reset")
      },
      get addDevicePasswordInput(){
        return getByTestId(container, "input-add-device-password") as HTMLInputElement
      },
    }
  }

  // 🔥 mamy dostęp tylko do elementów (buttony, input)
  // ale NIE ma tutaj ani definicji callbacków
  // ani metod z nimi powiązanych
  static bindTo(container: HTMLElement){
    return new AddDeviceTokenViewPO(unsafe_cast.ElementToHTMLElement(container))
  }

  clickTokenCancelButton(){
    fireEvent.click(this.elements.tokenCancelButton)
  }
  
  clickTokenSubmitButton(){
    fireEvent.click(this.elements.tokenSubmitButton)
  }

  clickTokenResetButton(){
    fireEvent.click(this.elements.tokenResetButton)
  }

  setAddDevicePassword(value: string){
    fireEvent.change(this.elements.addDevicePasswordInput, { target: { value } })
  }

  submitAddDeviceToken(password: string){
    this.setAddDevicePassword(password)
    this.clickTokenSubmitButton()
  }
  
  async expectTextDisplayed(text: string){
    return findByText(this.container, text)
  }
}

// 🔥 dopiero tutaj dochodzą i callbacki i metody powiązane z nimi
export class AddDeviceTokenViewPOStandalone extends AddDeviceTokenViewPO {
  protected constructor(
    protected container: HTMLElement,
    protected onCancelSpy: jest.Mock,
    protected onSubmitSpy: jest.Mock,
    protected onResetSpy: jest.Mock,
  ){
    super(container);
  }

  get expectCancelCallback(){
    return expect(this.onCancelSpy)
  }

  get expectSubmitCallback(){
    return expect(this.onSubmitSpy)
  }

  get expectResetCallback(){
    return expect(this.onResetSpy)
  }

  static render(params: {
    deviceName: string
    instruction: string
    error: boolean
  }) {
    const onCancel = jest.fn()
    const onSubmit = jest.fn()
    const onReset = jest.fn()

    const { container } = render(<AuthorizeDeviceAddDeviceTokenView
      onCancel={onCancel}
      onSubmit={onSubmit}
      onReset={onReset}
      {...params}
    />)

    return new AddDeviceTokenViewPOStandalone(unsafe_cast.ElementToHTMLElement(container), onCancel, onSubmit, onReset);
  }
}
