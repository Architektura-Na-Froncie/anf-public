import { Button, Typography } from "ui/atoms"
import { ButtonList } from "ui/molecules"

interface AuthorizeDeviceAddDeviceConfirmationViewProps {
  deviceName: string
  onClose: () => void
}

export const AuthorizeDeviceAddDeviceConfirmationView = (props: AuthorizeDeviceAddDeviceConfirmationViewProps) => {
  const { deviceName, onClose } = props

  return <>
    <Typography variant="h2">Urządzenie zapisane jako zaufane</Typography>
    <Typography variant="body">Przy następnym logowaniu z urządzenia <em>{deviceName}</em> nie będziemy Ci już zawracali gitary unijnymi dyrektywami. Doceń to :)</Typography>
    <ButtonList align="center">
      <Button
        data-testid="btn-close"
        variant="SECONDARY"
        onClick={onClose}
      >wjeżdżam w apkę</Button>
    </ButtonList>
  </>
}
