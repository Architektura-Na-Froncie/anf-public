import styled, { css } from 'styled-components';

interface ChangeLabelProps {
  variant: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

const theme = {
  NEUTRAL: css`
  `,
  POSITIVE: css`
    background: green;
    color: #fff;
  `,
  NEGATIVE: css`
    background: darkred;
    color: #fff;
  `
}

const ChangeLabelStyled = styled.span<{
  variant: ChangeLabelProps['variant']
}>`
  display: inline-block;
  padding: .25em .5em;
  background: rgba(0, 0, 0, .1);
  color: #555;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: bold;
  font-size: .85rem;

  ${(props) => theme[props.variant]}
`;

export const ChangeLabel: React.FC<Partial<ChangeLabelProps>> = ({ children, variant = 'NEUTRAL' }) => {
  return (
    <ChangeLabelStyled variant={variant}>
      {children}
    </ChangeLabelStyled>
  );
}
