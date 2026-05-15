export type AuthorizeDeviceState =
  | {
    type: "LOADING"
  }
  | {
    type: "LOGGED_OUT"
  }
  | {
    type: "CHOOSE_METHOD"
  }
  | {
    type: "ALLOW_ONCE_TOKEN"
    tokenId: string
    instruction: string
    error: boolean
  }
  | {
    type: "ALLOW_ONCE_SUCCESS"
  }
  | {
    type: "ADD_DEVICE_FORM"
  }
  | {
    type: "ADD_DEVICE_TOKEN"
    deviceName: string
    tokenId: string
    instruction: string
    error: boolean
  }
  | {
    type: "ADD_DEVICE_CONFIRMATION"
    deviceName: string
  }
  | {
    type: "ADD_DEVICE_SUCCESS"
  }


export interface AuthorizeDeviceProcess {
  readonly state: AuthorizeDeviceState | { type: "LOADING" }
  cancelChoice(): Promise<void>
  chooseAllowOnce(): Promise<void>
  submitAllowOnce(password: string): Promise<void>
  chooseAddDevice(): void
  submitDeviceName(currentDeviceName: string): Promise<void>
  resetToken(): Promise<void>
  submitAddDevice(password: string): Promise<void>
  confirmDeviceAdded(): void
}
