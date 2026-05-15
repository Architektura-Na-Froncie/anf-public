import { Button, Typography } from "ui/atoms"
import { ButtonList } from "ui/molecules"

interface AuthorizeDeviceChooseMethodViewProps {
  onAllowDeviceOnce: () => void
  onAddDeviceToTrusted: () => void
  onLogout: () => void
}

export const AuthorizeDeviceChooseMethodView = (props: AuthorizeDeviceChooseMethodViewProps) => {
  const { onAllowDeviceOnce, onAddDeviceToTrusted, onLogout } = props
  return <>
    <Typography variant="h2">Nieznane urządzenie</Typography>
    <Typography variant="body">Mistrzu, jest sprawa... nie mamy pewności, że Ty to Ty. Musimy zautoryzować urządzenie, z którego do nas klikasz.</Typography>
    <Typography variant="body">No i albo zapisujemy Twoje urządzenie jako zaufane (i nie zobaczysz więcej tego komunikatu) - albo każdorazowo będziesz autoryzować urządzenie, z którego próbujesz sie zalogować do apki.</Typography>
    <Typography variant="body">Dobrze się zastanów. Nam to rybka.</Typography>
    <ButtonList align="center">
      <Button
        data-testid="btn-choose-add-device"
        variant="PRIMARY"
        onClick={onAddDeviceToTrusted}
      >zapisz to urządzenie jako zaufane</Button>
      <Button
        data-testid="btn-choose-allow-once"
        variant="PRIMARY"
        onClick={onAllowDeviceOnce}
      >jednorazowy wjazd do apki</Button>
      <Button
        data-testid="btn-choose-logout"
        variant="SECONDARY"
        onClick={onLogout}
      >wyloguj</Button>
    </ButtonList>
  </>
}
