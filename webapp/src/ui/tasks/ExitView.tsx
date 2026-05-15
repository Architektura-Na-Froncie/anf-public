/* eslint-disable jsx-a11y/accessible-emoji */
import { Typography } from "ui/atoms";
import { Center, EmojiWrapper } from './styled';

export const ExitView: React.FC = () => {
  return (
    <Center>
      <Typography variant="h1">Exam completed!</Typography>
      <EmojiWrapper role="img" aria-label="Party popper emoji">🎉</EmojiWrapper>
      <Typography variant="body">Please wait for you results to be evaluated.</Typography>
    </Center>
  )
}
