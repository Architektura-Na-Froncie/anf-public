import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from 'ui/palette';
import { Container } from '../layout';

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.header`
  background: white;
  font-size: calc(10px + 2vmin);
  color: white;
  flex: 0 0 auto;
  border-bottom: 1px solid ${colors.headerBorder};
  border-top: 4px solid ${colors.primary};
  position: relative;
`;

Header.defaultProps = {
  role: 'banner',
};

const HeaderLogo = styled(Link)`
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  font-size: 32px;
  background: ${colors.primary};
  background: linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryDarker} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-decoration: none;
  color: transparent;
  line-height: 1;
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-flow: row;
  align-items: stretch;
  margin: 0;

  a {
    display: block;
    flex: 1 0 auto;
    text-decoration: none;
    color: ${colors.headerLink};
    padding: 30px 20px;
    transition: all 150ms;
    font-size: 1rem;

    &:hover,
    &:active {
      color: ${colors.headerLinkHover};
      background: ${colors.headerLinkBgHover};
    }
  }
`;

export const AppHeader: React.FC = () => {
  return <Header>
    <HeaderContainer>
      <HeaderLogo to="/" data-testid="link-app-logo">ACME</HeaderLogo>
      <HeaderNav>
        <Link to="/employee-plans" data-testid="link-employee-plans">Plany kadrowe</Link>
        <Link to="/exam" data-testid="link-exam">Egzamin</Link>
        <Link to="/account-history" data-testid="link-account-history">Historia konta</Link>
        <Link to="/authorize-device" data-testid="link-authorize-device">Autoryzuj urządzenie</Link>
        <Link to="/change-limits" data-testid="link-change-limits">Ustawienia limitów</Link>
        <Link to="/currency-exchange" data-testid="link-currency-exchange">Wymiana walut</Link>
      </HeaderNav>
    </HeaderContainer>
  </Header>
}
