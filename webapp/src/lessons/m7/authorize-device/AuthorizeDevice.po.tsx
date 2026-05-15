import { findByText, fireEvent, getByTestId, getByRole, getByLabelText, getByText, queryByTestId, render, waitFor } from "@testing-library/react";

import { unsafe_cast } from "lib/lang";
import { AddDeviceTokenViewPOStandalone } from "./AddDeviceTokenView.po";

// wyjątkowo rozszerzamy PageObject:render o możliwość wyrenderowania komponentu wg przekazanego parametru
// normalnie mielibyśmy jedną implementację (bo po co więcej)
// ale my tutaj szkoleniowo mamy implementacji kilka :)
// i chcemy, aby wszystkie były testowane
type AuthorizeDeviceProcessComponent = React.FC<{
  onSuccess: () => void
  onLogout: () => void
}>

export class AuthorizeDevicePO {
  private elements: {
    chooseAddDeviceButton: HTMLElement;
    chooseAllowOnceButton: HTMLElement;
    chooseLogoutButton: HTMLElement;
    addDeviceNameInput: HTMLInputElement;
    addDeviceNameSubmitButton: HTMLElement;
    deviceAddConfirmationCheckbox: HTMLInputElement;
    tokenCancelButton: HTMLElement;
    tokenSubmitButton: HTMLElement;
    tokenResetButton: HTMLElement;
    addDevicePasswordInput: HTMLInputElement;
    allowOncePasswordInput: HTMLInputElement;
    closeButton: HTMLElement;
  };

  /**
   * 🔥 UWAGA!
   * W zwykłym projekcie mielibyśmy tylko 1 sposób (1 przyjętą konwencję) na wyszukiwanie węzłów DOM.
   * Tutaj - z kontekście szkoleniowym - mamy 2 "strategie" - wg data-id oraz wg aria role, labelek itp.
   */
  private elementsByDataID(container: HTMLElement){
    return {
      get chooseAddDeviceButton(){ return getByTestId(container, "btn-choose-add-device") },
      get chooseAllowOnceButton(){ return getByTestId(container, "btn-choose-allow-once") },
      get chooseLogoutButton(){ return getByTestId(container, "btn-choose-logout") },
      get addDeviceNameInput(){ return getByTestId(container, "input-add-device-name") as HTMLInputElement },
      get addDeviceNameSubmitButton(){ return getByTestId(container, "btn-add-device-name-submit") },
      get deviceAddConfirmationCheckbox(){ return getByTestId(container, "checkbox-add-device-confirmation") as HTMLInputElement },
      get tokenCancelButton(){ return getByTestId(container, "btn-token-cancel") },
      get tokenSubmitButton(){ return getByTestId(container, "btn-token-submit") },
      get tokenResetButton(){ return getByTestId(container, "btn-token-reset") },
      get addDevicePasswordInput(){ return getByTestId(container, "input-add-device-password") as HTMLInputElement },
      get allowOncePasswordInput(){ return getByTestId(container, "input-allow-once-password") as HTMLInputElement },
      get closeButton(){ return getByTestId(container, "btn-close") },
    }
  }
  private elementsByAriaRoleEtc(container: HTMLElement){
    return {
      get chooseAddDeviceButton(){ return getByRole(container, "button", { name: "zapisz to urządzenie jako zaufane" }) },
      get chooseAllowOnceButton(){ return getByRole(container, "button", { name: "jednorazowy wjazd do apki" }) },
      get chooseLogoutButton(){ return getByRole(container, "button", { name: "wyloguj" }) },
      get addDeviceNameInput(){ return getByRole(container, "textbox", { name: "Nazwa urządzenia" }) as HTMLInputElement },
      get addDeviceNameSubmitButton(){ return getByRole(container, "button", { name: "zapisz urządzenie jako zaufane" }) },
      get deviceAddConfirmationCheckbox(){ return getByLabelText(container, "Uroczyście oświadczam", { exact: false }) as HTMLInputElement },
      get tokenCancelButton(){ return getByText(container, "zaniechaj", { exact: false }) },
      get tokenSubmitButton(){ return getByRole(container, "button", { name: "potwierdź" }) },
      get tokenResetButton(){ return getByRole(container, "button", { name: "wyślij ponownie kod" }) },
      get addDevicePasswordInput(){ return getByLabelText(container, "Wpisz hasło SMS" ) as HTMLInputElement },
      get allowOncePasswordInput(){ return getByLabelText(container, "Wpisz hasło SMS" ) as HTMLInputElement },
      get closeButton(){ return getByRole(container, "button", { name: "wjeżdżam w apkę" }) },
    }
  }

  protected constructor(
    protected container: HTMLElement,
    protected onSuccessSpy: jest.Mock,
    protected onLogoutSpy: jest.Mock,
  ){
    // 🔥 selektory wg data-id:
    // this.elements = this.elementsByDataID(container)
    // 🔥 selektory wg aria role, labele itp:
    this.elements = this.elementsByAriaRoleEtc(container)
  }

  clickChooseAddDeviceButton(){
    fireEvent.click(this.elements.chooseAddDeviceButton)
  }

  clickChooseAllowOnceButton(){
    fireEvent.click(this.elements.chooseAllowOnceButton)
  }

  clickLogoutButton(){
    fireEvent.click(this.elements.chooseLogoutButton)
  }

  setAddDeviceName(value: string){
    fireEvent.change(this.elements.addDeviceNameInput, { target: { value } })
  }

  clickAddDeviceNameSubmitButton(){
    fireEvent.click(this.elements.addDeviceNameSubmitButton)
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

  toggleAddDeviceConfirmationCheckbox(){
    fireEvent.click(this.elements.deviceAddConfirmationCheckbox)
  }

  setAddDevicePassword(value: string){
    fireEvent.change(this.elements.addDevicePasswordInput, { target: { value } })
  }

  setAllowOncePassword(value: string){
    fireEvent.change(this.elements.allowOncePasswordInput, { target: { value } })
  }

  clickCloseButton(){
    fireEvent.click(this.elements.closeButton)
  }

  confirmAddDeviceName(deviceName?: string){
    if(deviceName){
      this.setAddDeviceName(deviceName)
    }
    if (!this.elements.deviceAddConfirmationCheckbox.checked){
      this.toggleAddDeviceConfirmationCheckbox()
    }
    this.clickAddDeviceNameSubmitButton()
  }

  submitAddDeviceToken(password: string){
    this.setAddDevicePassword(password)
    this.clickTokenSubmitButton()
  }

  submitAllowOnceToken(password: string){
    this.setAllowOncePassword(password)
    this.clickTokenSubmitButton()
  }

  async expectTextDisplayed(text: string){
    return findByText(this.container, text, { exact: false })
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

  // 🔥 composite page object
  getAddDeviceTokenViewPO(){
    return AddDeviceTokenViewPOStandalone.bindTo(this.container)
  }

  static render(AuthorizeDeviceProcess: AuthorizeDeviceProcessComponent) {
    const onSuccess = jest.fn()
    const onLogout = jest.fn()

    const { container } = render(<AuthorizeDeviceProcess
      onSuccess={onSuccess}
      onLogout={onLogout}
    />)

    return new AuthorizeDevicePO(unsafe_cast.ElementToHTMLElement(container), onSuccess, onLogout);
  }
}
