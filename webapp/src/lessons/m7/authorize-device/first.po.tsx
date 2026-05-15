import { findByText, fireEvent, getByTestId, queryByTestId, render, waitFor } from "@testing-library/react";

import { AuthorizeDeviceProcessUnion as AuthorizeDeviceProcess } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessUnion";

export class AuthorizeDevicePO {
  private elements: {
    chooseAllowOnceButton: HTMLElement,
    allowOncePasswordInput: HTMLInputElement,
    tokenSubmitButton: HTMLElement,
  }

  protected constructor(
    protected container: HTMLElement,
    protected onSuccessSpy: jest.Mock,
    protected onLogoutSpy: jest.Mock,
  ){
    this.elements = {
      get chooseAllowOnceButton(){
        return getByTestId(container, "btn-choose-allow-once")
      },
      get allowOncePasswordInput(){
        return getByTestId(container, "input-allow-once-password") as HTMLInputElement
      },
      get tokenSubmitButton(){
        return getByTestId(container, "btn-token-submit")
      },
    }
  }

  static render(){
    const onSuccess = jest.fn()
    const onLogout = jest.fn()
    const { container } = render(<AuthorizeDeviceProcess
      onSuccess={onSuccess}
      onLogout={onLogout}
    />)

    return new AuthorizeDevicePO(container as HTMLElement, onSuccess, onLogout)
  }

  clickChooseAllowOnceButton(){
    fireEvent.click(this.elements.chooseAllowOnceButton)
  }

  async expectTextDisplayed(text: string){
    return findByText(this.container, text)
  }

  submitAllowOnceToken(value: string){
    fireEvent.change(this.elements.allowOncePasswordInput, { target: { value } })
    fireEvent.click(this.elements.tokenSubmitButton)
  }

  async expectTextDisappeared(text: string){
    return waitFor(() => { // await text disappears after clicked
      expect(this.container).not.toHaveTextContent(text)
    })
  }

  async expectLoaderDisappeared(){
    await waitFor(() => { // await loader disappears
      expect(queryByTestId(this.container, 'img-loader')).not.toBeInTheDocument()
    })
  }

  get expectSuccessCallback(){
    return expect(this.onSuccessSpy)
  }

  get expectLogoutCallback(){
    return expect(this.onLogoutSpy)
  }
}
