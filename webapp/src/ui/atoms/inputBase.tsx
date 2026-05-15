import { colors } from "ui/palette";
import { css } from 'styled-components';

export const inputBase = css<{
  error?: any;
  disabled?: boolean;
}>`
  display: inline-block;
  padding: .5rem;
  margin: 0;
  min-width: 180px;
  background-color: ${colors.white};
  border: 2px solid ${(props) => props.error ? colors.mainRed : colors.grey};
  border-radius: 4px;
  flex: 1 1 auto;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'initial'};
  box-sizing: border-box;

  &&:focus {
    border-color: ${(props) => props.error ? colors.mainRed : colors.mainBlue};
    outline: none;
  }

  &&[disabled] {
    background-color: ${colors.lighterGrey};
  }
`;
