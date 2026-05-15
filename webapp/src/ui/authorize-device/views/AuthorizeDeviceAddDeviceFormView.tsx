import { useState } from "react"

import { Button, Typography } from "ui/atoms"
import { CheckboxField, TextField, ButtonList } from "ui/molecules"

interface AuthorizeDeviceAddDeviceFormViewProps {
  onSubmit: (deviceName: string) => void
}

export const AuthorizeDeviceAddDeviceFormView = (props: AuthorizeDeviceAddDeviceFormViewProps) => {
  const { onSubmit } = props
  const [deviceName, setDeviceName] = useState('Mój komputer')
  const [checked, setChecked] = useState(false)

  return <>
    <Typography variant="h2">Zapisz to urządzenie jako zaufane</Typography>
    <Typography variant="body">Jeszcze kilka inputów, checkboxów i buttonów i będziemy w domu... Zacznijmy od nazwy urządzenia.</Typography>
    <TextField
      id="input-add-device-name"
      label="Nazwa urządzenia"
      layoutDirection="vertical"
      defaultValue={deviceName}
      onChange={setDeviceName}
    />
    <CheckboxField
      id="checkbox-add-device-confirmation"
      label='Uroczyście oświadczam, że jestem użytkownikiem tego urządzenia. Nie chce mi się każdorazowo podwójnie logować, więc dodajmy to urządzenie do "zaufanych" i miejmy to już za sobą...'
      defaultChecked={checked}
      onChange={setChecked}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-add-device-name-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(deviceName)}
        disabled={!checked}
      >zapisz urządzenie jako zaufane</Button>
    </ButtonList>
  </>
}
