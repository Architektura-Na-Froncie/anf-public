import { makeAutoObservable, makeObservable, observable, action, computed } from 'mobx'
import { StateMember } from 'lessons/m6/state-members'
import { AuthorizeDeviceState, AuthorizeDeviceProcess } from 'lessons/m6/authorize-device/types'

import { getTokenInstruction, sendTokenCode } from 'api/token'

export class AuthorizeDeviceStore implements AuthorizeDeviceProcess {
  constructor(){
    makeObservable(this, {
      _state: observable,
      setState: action,
      state: computed,
    })
  }

  public _state: AuthorizeDeviceState = {
    type: "CHOOSE_METHOD"
  }

  setState(newState: AuthorizeDeviceState){
    this._state = newState
  }

  get state(){
    return this._state
  }

  // analogicznie jak w generycznej funkcji "assertState"
  // ale dodatkowo dodajemy constraint TType na dostępne (istniejące) typy
  assertState<TType extends AuthorizeDeviceState['type']>(
    state: { type: string },
    expectedType: TType
  ): asserts state is StateMember<TType> {
    if (state.type !== expectedType){
      throw new Error(`Invalid state ${state.type} (expected: ${expectedType})`)
    }
  }

  cancelChoice = async () => {
    this.setState({ type: "CHOOSE_METHOD" })
  }

  chooseAllowOnce = async () => {
    this.assertState(this._state, "CHOOSE_METHOD")

    this.setState({ type: "LOADING" })
    const tokenInstruction = await getTokenInstruction()
    this.setState({
      type: "ALLOW_ONCE_TOKEN",
      ...tokenInstruction,
      error: false
    })
  }

  submitAllowOnce = async (password: string) => {
    this.assertState(this._state, "ALLOW_ONCE_TOKEN")

    // UWAGA! ustawienie stanu na "loading" może wyczyścić aktualny stan
    // (bo zostałby podmieniony - dlatego zmienne lokalne)
    const instruction = this._state.instruction
    const tokenId = this._state.tokenId
    // zobaczmym, że `assertState` powyżej
    // (1) rzuca errory, jeśli metoda jest w błędnym stanie oraz
    // (2) doprecyzowuje (w compile-time) typ aktualnego stanu, które w tym wypadku jest BŁĘDNE :(
    this.setState({ type: "LOADING" })
    // (2) this._state // w compile-time jest "ALLOW_ONCE_TOKEN" co jesty nieprawdą
    // `this._state` oraz `this.setState` w runtime odnoszą się do jednej rzeczy, ale kompilator widzi je jako osobne - i traci type flow
    // jaka jest lepsza opcja?
    // moglibyśmy dodać `this.assertState(this._state, "LOADING")` albo usunąć assertState na samym początku - ale wtedy łamiemy (1) :(
    // inna opcja to wprowadzić osobne stany LOADING obsługujące różne przejścia między stanami - podobnie jak robi xstate (większy porządek, ale i więcej stanów/więcej roboty)
    try {
      await sendTokenCode({ tokenId, tokenCode: password })
      this.setState({
        type: "ALLOW_ONCE_SUCCESS"
      })
    } catch (e: unknown) {
      this.setState({
        type: "ALLOW_ONCE_TOKEN",
        instruction,
        tokenId,
        error: true,
      })
    }
  }

  chooseAddDevice = async () => {
    this.assertState(this._state, "CHOOSE_METHOD")
    this.setState({
      type: "ADD_DEVICE_FORM",
    })
  }

  submitDeviceName = async (currentDeviceName: string) => {
    this.assertState(this._state, "ADD_DEVICE_FORM")
    
    this.setState({ type: "LOADING" })
    const tokenInstruction = await getTokenInstruction()
    this.setState({
      type: "ADD_DEVICE_TOKEN",
      deviceName: currentDeviceName,
      ...tokenInstruction,
      error: false,
    })
  }

  resetToken = async () => {
    this.assertState(this._state, "ADD_DEVICE_TOKEN")

    // watch out! setting state to loading might reset the deviceName
    const deviceName = this._state.deviceName
    this.setState({ type: "LOADING" })
    const tokenInstruction = await getTokenInstruction()
    this.setState({
      type: "ADD_DEVICE_TOKEN",
      deviceName,
      ...tokenInstruction,
      error: false,
    })
  }

  submitAddDevice = async (password: string) => {
    this.assertState(this._state, "ADD_DEVICE_TOKEN")

    // watch out! setting state to loading might reset the deviceName
    const deviceName = this._state.deviceName
    const instruction = this._state.instruction
    const tokenId = this._state.tokenId
    this.setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId, tokenCode: password })
      this.setState({
        type: "ADD_DEVICE_CONFIRMATION",
        deviceName,
      })
    } catch (e: unknown) {
      this.setState({
        type: "ADD_DEVICE_TOKEN",
        deviceName,
        instruction,
        tokenId,
        error: true,
      })
    }
  }

  confirmDeviceAdded = async () => {
    this.assertState(this._state, "ADD_DEVICE_CONFIRMATION")
    this.setState({
      type: "ADD_DEVICE_SUCCESS",
    })
  }
}
