import { useState } from "react"

import { Button, Typography } from "ui/atoms"
import { TextField, ButtonList } from "ui/molecules"

interface AuthorizeDeviceAddDeviceTokenViewProps {
  deviceName: string
  instruction: string
  onSubmit: (password: string) => void
  onReset: () => void
  onCancel: () => void
  error: boolean
}

export const AuthorizeDeviceAddDeviceTokenView = (props: AuthorizeDeviceAddDeviceTokenViewProps) => {
  const { deviceName, instruction, onSubmit, onReset, onCancel, error } = props
  const [password, setPassword] = useState('')

  return <>
    <Typography variant="h2">Zapisz to urządzenie jako zaufane</Typography>
    <Typography variant="body">Już za chwilę urządzenie "{deviceName}" zostanie zapisane jako zaufane. Jest radość.</Typography>
    <Typography variant="body">Unijna dyrektywa PSD2 narzuca obowiązek <em>silnego uwierzytelnienia klienta</em>. Cokolwiek to oznacza. Obadaj telefon, bo wysłaliśmy Ci SMSa.</Typography>
    <Typography variant="body"><a href="https://pl.wikipedia.org/wiki/Payment_Services_Directive#Poprawiona_dyrektywa_w_sprawie_us%C5%82ug_p%C5%82atniczych_(PSD2)">Dlaczego mi to robicie?...</a></Typography>
    <TextField
      type="password"
      id="input-add-device-password"
      label={instruction}
      layoutDirection="vertical"
      defaultValue={password}
      onChange={setPassword}
      error={error ? "Niepoprawny token" : undefined}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-token-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(password)}
      >potwierdź</Button>
      <Button
        data-testid="btn-token-reset"
        variant="SECONDARY"
        onClick={onReset}
      >wyślij ponownie kod</Button>
      <Button
        data-testid="btn-token-cancel"
        variant="SECONDARY"
        onClick={onCancel}
      >zaniechaj</Button>
    </ButtonList>
  </>
}
